import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { CustomMove, isMoveItem, ItemMove, ItemMoveType, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { CustomMoveType } from '../material/CustomMoveType'
import { getFactionCardDescription, getFactionCardRule } from '../material/FactionCard'
import { RuleId } from './RuleId'
import { onBattlefieldAndAstralPlane } from '../utils/LocationUtils'

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

    //TODO: compute all modifications on all cards (for example natural camouflage protect adjacent allies from attacks). Skills and attributes can also be desactivated

    const cardsInBattlefield = this
      .material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)

    const playerCards = cardsInBattlefield.player(this.player)
    const opponentsCards = cardsInBattlefield.player((player) => player !== this.player)

    // Playable cards are those that can be place in this phase (initiative or not)
    // And with an active token on them
    const playableCards = playerCards.getIndexes()

    const moves: MaterialMove[] = []
    // Compute all attack and move moves
    for (const index of playableCards) {
      const rule = getFactionCardRule(this.game, index)
      if (!rule.isActive(this.initiative)) continue
      const attackRule = rule.attack()
      const moveRule = rule.move()

      if (attackRule && this.canAttack(index)) {
        moves.push(...attackRule.getPossibleAttacks(opponentsCards))
      }

      if (moveRule && this.canMove(index)) {
        moves.push(...moveRule.getPossibleMoves(cardsInBattlefield))
      }
    }

    moves.push(this.endTurnMove())
    return moves
  }

  canAttack = (cardIndex: number) => {
    const { activatedCards = [] } = this.getPlayerMemory<ActivationRuleMemory>()

    // For cards that can attack, verify that is was not activated
    const activatedCardIndex = activatedCards.findIndex((card) => card.card === cardIndex)
    if (activatedCardIndex === -1) return true
    // If the card is not the last one in the array, can't attack
    if (activatedCardIndex !== (activatedCards.length - 1)) return false

    const activatedCard = activatedCards[activatedCardIndex]
    return activatedCard.targets === undefined && activatedCard.omnistrike === undefined
  }

  canMove = (cardIndex: number) => {
    const { activatedCards = [] } = this.getPlayerMemory<ActivationRuleMemory>()

    // 1. must not be in the memory
    return !activatedCards.find((card) => card.card === cardIndex)
  }

  memorizeCardPlayed(activation: ActivatedCard) {
    const { activatedCards = [] } = this.getMemory<ActivationRuleMemory>(this.player)
    const activatedCard = activatedCards.find((activatedCard) => activatedCard.card === activation.card)
    if (!activatedCard) {
      this.memorize<ActivationRuleMemory>({
        activatedCards: [...activatedCards, activation]
      }, this.player)

    } else {
      const updatedActivation = { ...activatedCards, ...activation }
      this.memorize<ActivationRuleMemory>({
        activatedCards: [...activatedCards.filter((card) => card !== activatedCard), updatedActivation]
      }, this.player)
    }
  }

  endTurnMove = (): MaterialMove => {
    if (this.player == this.game.players[1]) {
      return this.rules().startPlayerTurn(RuleId.EndPhaseRule, this.nextPlayer)
    }

    return this.rules().startPlayerTurn(RuleId.ActivationRule, this.nextPlayer)
  }

  beforeItemMove(move: ItemMove<PlayerId, MaterialType, LocationType>): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (move.type === ItemMoveType.Move && move.itemType === MaterialType.FactionCard) {

      // If card is dropped on a space where there is another card, swap them
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

        this.memorizeCardPlayed({ card: cardOnDestination.getIndex() })

        // TODO: Get all adjacent cards, and apply their "onMoveAdjacentCard" to handle cards like "the fear"


        return cardOnDestination.moveItems({ location: { ...sourceCard.location } })
      }
    }

    return []
  }

  onRuleEnd(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (this.initiative) return []

    // Clean the activations
    this.memorize<ActivationRuleMemory>({ activatedCards: [] }, this.player)

    // Apply end turn effect on card
    return this
      .material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)
      .getIndexes()
      .flatMap((index: number) => getFactionCardRule(this.game, index).onTurnEnd())
  }


  onCustomMove(move: CustomMove): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (move.type === CustomMoveType.Attack) {
      const card = this.material(MaterialType.FactionCard).getItem(move.data.card)!
      const rule = getFactionCardRule(this.game, move.data.card)
      this.memorizeCardPlayed({
        card: move.data.card,
        targets: move.data.targets,
        omnistrike: getFactionCardDescription(card.id.front).hasOmnistrike()
      })

      const attackRule = rule.attack()
      const attackConsequences = attackRule ? attackRule.attack(move.data.targets, []) : []
      const deadOpponents = attackConsequences.filter(this.isDiscardFactionCard)
      if (deadOpponents.length === move.data.targets.length) {
        attackConsequences.push(this.rules().customMove(CustomMoveType.SolveAttack))
      }

      delete this.game.droppedItem

      return [
        // Perform the attack (may discard cards, )
        ...attackConsequences,
        // Search for after activation effect moves
        ...rule.afterActivation()
      ]
    }

    if (move.type === CustomMoveType.SolveAttack) {
      this.memorize<ActivationRuleMemory>({ activatedCards: [] }, this.player)
    }

    return []
  }

  isDiscardFactionCard = (move: MaterialMove) => {
    return isMoveItem(move, MaterialType.FactionCard) && move.position.location?.type === LocationType.PlayerDiscard
  }

  afterItemMove(move: ItemMove<PlayerId, MaterialType, LocationType>): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const moves: MaterialMove[] = []
    if (move.type !== ItemMoveType.Move || move.itemType !== MaterialType.FactionCard) return []

    if (move.position.location?.type === LocationType.Battlefield) {
      const rule = getFactionCardRule(this.game, move.itemIndex)
      this.memorizeCardPlayed({ card: move.itemIndex })
      if (!rule.attack()?.canAttack()) {
        moves.push(...rule.afterActivation())
      }
    }

    if (move.position.location?.type === LocationType.PlayerDiscard) {
      const rule = getFactionCardRule(this.game, move.itemIndex)
      return rule.afterDiscard()
    }

    return moves
  }
}
