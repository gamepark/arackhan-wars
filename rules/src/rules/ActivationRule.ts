import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { CustomMove, ItemMove, ItemMoveType, Material, MaterialItem, MaterialMove, MoveItem, PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { CustomMoveType } from '../material/CustomMoveType'
import { getFactionCard } from '../material/FactionCardType'
import { RuleId } from './RuleId'
import { battlefieldSpaceCoordinates } from '../material/spaces'
import { FactionCardKind } from './cards/FactionCardRule'

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
    const cardsInBattlefield = this
      .material(MaterialType.FactionCard)
      .location((location) => location.type === LocationType.Battlefield || location.type === LocationType.AstralPlane)

    const playerCards = cardsInBattlefield.player(this.player)
    const opponentsCards = cardsInBattlefield.player((player) => player !== this.player)

    // Playable cards are those that can be place in this phase (initiative or not)
    // And with an active token on them
    const playableCards: number[] = playerCards
      .filter(this.canBePlayedInThisPhase)
      .getIndexes()
      .filter(this.isActivableCard)

    const moves: MaterialMove[] = []

    // Compute all attack moves
    const attackMoves: CustomMove[] = playableCards
      .flatMap((cardIndex: number) => this.computeAttackOpponentMoves(playerCards.getItem(cardIndex)!, opponentsCards, cardIndex))

    // Compute all card moves
    const moveMoves: MoveItem[] = playableCards
      .flatMap((cardIndex: number) => this.computeItemMoves(playerCards.getItem(cardIndex)!, cardsInBattlefield))

    moves.push(
      ...attackMoves,
      ...moveMoves,
      ...this.endTurnMove()
    )

    return moves
  }

  computeAttackOpponentMoves(attacker: MaterialItem, opponentsCards: Material, cardIndex: number) {
    if (!this.canAttack(cardIndex)) return []
    return opponentsCards.getIndexes()
      // Asking the card rule if it can attack the opponent
      .filter((index: number) => getFactionCard(attacker.id.front).canAttackThisOpponent(attacker, opponentsCards.getItem(index)!))

      // Convert attacks to custom moves
      .map((index) => this.rules().customMove(CustomMoveType.Attack, { card: cardIndex, targets: [index] }))
  }

  computeItemMoves(card: MaterialItem, cardsInBattlefield: Material<PlayerId, MaterialType, LocationType>) {
    return battlefieldSpaceCoordinates
      .filter((space) => getFactionCard(card.id.front).canMoveTo(card, space, cardsInBattlefield))
      .flatMap((space) => (
        cardsInBattlefield
          .id(card.id)
          .moveItems({ location: { type: LocationType.Battlefield, x: space.x, y: space.y } }))
      )
  }

  canBePlayedInThisPhase = (item: MaterialItem) => {
    if (!this.initiative) return true
    return getFactionCard(item.id.front).hasInitiative()
  }

  canAttack = (cardIndex: number) => {
    const { activatedCards = [] } = this.getPlayerMemory<ActivationRuleMemory>()

    // Check if the card itself can attack
    const item = this.material(MaterialType.FactionCard).getItem(cardIndex)!
    const factionCard = getFactionCard(item.id.front)
    if (!factionCard.canAttack()) return false

    // For cards that can attack, verify that is was not activated
    const cardState = activatedCards.find((card) => card.card === cardIndex)
    if (!cardState) return true
    return cardState.targets === undefined && cardState.omnistrike === undefined
  }

  isActivableCard = (cardIndex: number) => {

    // Spell is always considered activable
    const item = this.material(MaterialType.FactionCard).getItem(cardIndex)!
    const factionCard = getFactionCard(item.id.front)
    if (factionCard.kind === FactionCardKind.Spell) return true

    // Other cards are activable if there is a non returned token on it
    const token = this
      .material(MaterialType.FactionToken)
      .parent(cardIndex)
      .rotation((rotation) => !rotation?.y)
    if (!token.length) return true

    return token.rotation((rotation) => !rotation?.y).length
  }

  memorizeCardPlayed(player: PlayerId, activation: ActivatedCard) {
    const { activatedCards = [] } = this.getMemory<ActivationRuleMemory>(player)
    const activatedCard = activatedCards.find((activatedCard) => activatedCard.card === activation.card)
    if (!activatedCard) {
      this.memorize<ActivationRuleMemory>({
        activatedCards: [...activatedCards, activation]
      }, player)

    } else {
      const updatedActivation = { ...activatedCards, ...activation }
      this.memorize<ActivationRuleMemory>({
        activatedCards: [...activatedCards.filter((card) => card !== activatedCard), updatedActivation]
      }, player)
    }
  }

  attack(move: CustomMove) {
    // TODO: apply attack (discard) ?
    return this.material(MaterialType.FactionToken).parent(move.data.card).moveItems({ rotation: { y: 1 } })
  }

  endTurnMove = (): MaterialMove[] => {
    if (this.player == this.game.players[1]) {
      return [this.rules().startPlayerTurn(RuleId.EndPhaseRule, this.nextPlayer)]
    }

    // Apply onTurnEnd of card in case there is some effect
    const moves = this
      .material(MaterialType.FactionCard)
      .location((location) => location.type === LocationType.Battlefield || location.type === LocationType.AstralPlane)
      .player(this.player)
      .getItems()
      .flatMap((card) => getFactionCard(card.id.front).onTurnEnd(this))

    moves.push(
      this.rules().startPlayerTurn(RuleId.ActivationRule, this.nextPlayer)
    )

    return moves
  }

  beforeItemMove(move: ItemMove<PlayerId, MaterialType, LocationType>): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (move.type === ItemMoveType.Move && move.itemType === MaterialType.FactionCard) {

      // If card is dropped on an space where there is another card, swap them
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

        this.memorizeCardPlayed(cardOnDestination.getItem()!.location.player!, { card: cardOnDestination.getIndex() })
        return cardOnDestination.moveItems({ location: { ...sourceCard.location } })
      }
    }

    return []
  }


  onCustomMove(move: CustomMove): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (move.type === CustomMoveType.Attack) {
      const card = this.material(MaterialType.FactionCard).getItem(move.data.card)!
      const player = card.location.player!

      this.memorizeCardPlayed(player, {
        card: move.data.card,
        targets: move.data.targets,
        omnistrike: getFactionCard(card.id.front).hasOmnistrike()
      })

      return this.attack(move)
    }

    return []
  }

  afterItemMove(move: ItemMove<PlayerId, MaterialType, LocationType>): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const moves: MaterialMove[] = []
    if (move.type === ItemMoveType.Move && move.itemType === MaterialType.FactionCard && move.position.location?.type === LocationType.Battlefield) {
      const sourceCard = this
        .material(MaterialType.FactionCard)
        .getItem(move.itemIndex)!

      this.memorizeCardPlayed(sourceCard.location.player!, { card: move.itemIndex })
      if (!this.canAttack(move.itemIndex)) {
        moves.push(
          ...this.material(MaterialType.FactionToken).parent(move.itemIndex).moveItems({ rotation: { y: 1 } })
        )
      }

      moves.push(...getFactionCard(sourceCard.id.front).afterActivation(this))
    }

    return moves
  }
}
