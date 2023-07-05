import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { CustomMove, ItemMove, ItemMoveType, Material, MaterialItem, MaterialMove, MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { CustomMoveType } from '../material/CustomMoveType'
import { FactionCards } from '../material/FactionCardType'
import { CardAttribute, CardAttributeType } from './cards/FactionCardRule'
import { RuleId } from './RuleId'
import { battlefieldSpaceCoordinates } from '../material/spaces'

type ActivatedCard = {
  card: number;
  targets?: number[]
  omnistrike?: boolean
}

type ActivationRuleMemory = {
  activatedCards: ActivatedCard[]
}

export class ActivationRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  initiative = false

  getPlayerMoves(): MaterialMove[] {
    const cardsInBattlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const playerCards = cardsInBattlefield.player(this.player)
    const opponentsCards = cardsInBattlefield.player((player) => player !== this.player)

    const playableCards: number[] = playerCards
      .filter(this.canBePlayedInThisPhase)
      .indexes
      .filter(this.hasActiveToken)

    const moves = []
    const attackMoves: CustomMove[] = playableCards
      .filter((cardIndex: number) => this.canAttack(playerCards.getItem(cardIndex)!, cardIndex))
      .flatMap((cardIndex: number) => this.toAttackMoves(opponentsCards, cardIndex))

    const moveMoves: MoveItem[] = playableCards
      .filter((cardIndex) => this.canMove(playerCards.getItem(cardIndex)!, cardIndex))
      .flatMap((cardIndex: number) => this.toItemMoves(cardsInBattlefield, playerCards.getItem(cardIndex)!))

    moves.push(
      ...attackMoves,
      ...moveMoves,
      this.endTurnMove()
    )

    moves.push(this.endTurnMove())

    return moves
  }

  toAttackMoves(opponentsCards: Material<PlayerId, MaterialType, LocationType>, cardIndex: number) {
    return opponentsCards.indexes.map((index) => (
      // TODO: Compute real targets, now all cards are targetable
      this.rules().customMove(CustomMoveType.Attack, { card: cardIndex, targets: [index] })
    ))
  }

  toItemMoves(cardsInBattlefield: Material<PlayerId, MaterialType, LocationType>, card: MaterialItem) {
    return battlefieldSpaceCoordinates
      .filter((space) => {
        const cardOnSpace = cardsInBattlefield.location((location) => location.x === space.x && location.y === space.y).getItem()
        return !cardOnSpace || this.hasAttribute(cardOnSpace, CardAttributeType.Movement)
      })
      .flatMap((space) => cardsInBattlefield.id(card.id).moveItems({ location: { type: LocationType.Battlefield, x: space.x, y: space.y } }))
  }

  canBePlayedInThisPhase = (item: MaterialItem) => {
    if (!this.initiative) return true
    return this.hasAttribute(item, CardAttributeType.Initiative)
  }

  hasAttribute = (item: MaterialItem, attribute: CardAttributeType) => {
    return FactionCards[item.id.front].attributes?.some((a: CardAttribute) => a.type === attribute)
  }

  canAttack = (card: MaterialItem, cardIndex: number) => {
    const { activatedCards = [] } = this.getPlayerMemory<ActivationRuleMemory>()
    const cardState = activatedCards.find((card) => card.card === cardIndex)
    if (!cardState) return true

    const factionCard = FactionCards[card.id.front]

    return cardState.targets === undefined
      && cardState.omnistrike === undefined
      && factionCard.attack !== undefined
  }

  canMove = (card: MaterialItem, cardIndex: number) => {
    const factionCard = FactionCards[card.id.front]
    const { activatedCards = [] } = this.getPlayerMemory<ActivationRuleMemory>()

    // 1. must not be in the memory
    // 2. must have the movement attribute
    return !activatedCards.find((card) => card.card === cardIndex)
      && factionCard.attributes?.some((a: CardAttribute) => a.type === CardAttributeType.Movement)
  }

  hasActiveToken = (card: number) => {

    const token = this.material(MaterialType.FactionToken).parent(card)
    if (!token.length) return true

    return token.rotation((rotation) => !rotation?.y).length
  }

  endTurnMove = (): MaterialMove => {
    if (this.player == this.game.players[1]) {
      return this.rules().startPlayerTurn(RuleId.EndPhaseRule, this.nextPlayer)
    }

    return this.rules().startPlayerTurn(RuleId.ActivationRule, this.nextPlayer)
  }

  onCustomMove(move: CustomMove): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (move.type === CustomMoveType.Attack) {
      const card = this.material(MaterialType.FactionCard).getItem(move.data.card)!
      const player = card.location.player!

      this.memorizeCardPlayed(player, {
        card: move.data.card,
        targets: move.data.targets,
        omnistrike: this.hasAttribute(card, CardAttributeType.Omnistrike) && move.data.targets.length > 0
      })

      return this.triggerAttack(move)
    }

    return []
  }

  private memorizeCardPlayed(player: PlayerId, activation: ActivatedCard) {
    const { activatedCards = [] } = this.getMemory<ActivationRuleMemory>(player)
    const activatedCard = activatedCards.findIndex((activatedCard) => activatedCard.card === activation.card)
    if (!activatedCard) {
      activatedCards.push(activation)

    } else {
      Object.assign(activatedCard, activation)
    }

    this.memorize<ActivationRuleMemory>({ activatedCards })
  }

  triggerAttack(move: CustomMove) {
    // TODO: apply attack (discard) ?
    return this.material(MaterialType.FactionToken).parent(move.data.card).moveItems({ rotation: { y: 1 } })
  }

  beforeItemMove(move: ItemMove<PlayerId, MaterialType, LocationType>): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (move.type === ItemMoveType.Move && move.itemType === MaterialType.FactionCard) {
      const cardOnDestination = this
        .material(MaterialType.FactionCard)
        .location((location) => (
          location.type == LocationType.Battlefield
          && location.x === move.position.location?.x
          && location.y === move.position.location?.y
        ))

      if (cardOnDestination.length) {
        const sourceCard = this
          .material(MaterialType.FactionCard)
          .getItem(move.itemIndex)!

        return cardOnDestination.moveItems({ location: { ...sourceCard.location } })
      }
    }

    return []
  }

  afterItemMove(move: ItemMove<PlayerId, MaterialType, LocationType>): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (move.type === ItemMoveType.Move && move.itemType === MaterialType.FactionCard && move.position.location?.type === LocationType.Battlefield) {
      const sourceCard = this
        .material(MaterialType.FactionCard)
        .getItem(move.itemIndex)!

      if (!this.canAttack(sourceCard, move.itemIndex)) {
        return this.material(MaterialType.FactionToken).parent(move.itemIndex).moveItems({ rotation: { y: 1 } })
      }
    }

    return []
  }
}
