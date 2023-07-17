import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { CustomMove, isMoveItem, ItemMove, ItemMoveType, Material, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { CustomMoveType } from '../material/CustomMoveType'
import { getFactionCardDescription, getFactionCardRule } from '../material/FactionCard'
import { RuleId } from './RuleId'
import { onBattlefieldAndAstralPlane } from '../utils/LocationUtils'
import { areAdjacent } from '../utils/adjacent.utils'
import { CardModification, EffectRule } from './cards/rules/base/EffectRule'
import { ActivatedCard, ActivationRuleMemory } from './types'


export class ActivationRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  initiative = false

  getPlayerMoves(): MaterialMove[] {
    console.time()

    //TODO: compute all modifications on all cards (for example natural camouflage protect adjacent allies from attacks). Skills and attributes can also be desactivated

    const battlefieldCard = this
      .material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)

    const modifications = this.computeCardModifications(battlefieldCard)

    const playerCards = battlefieldCard.player(this.player)
    const opponentsCards = battlefieldCard.player((player) => player !== this.player)

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
        moves.push(...(attackRule.getLegalAttacks(opponentsCards, modifications)))
      }

      if (!this.canMoveOrUseAction(index)) continue


      if (moveRule) {
        moves.push(...moveRule.getLegalMovements(modifications))
      }

      if (rule.actionRule().length) {
        moves.push(this.rules().customMove(CustomMoveType.CardAction, { card: index }))
      }
    }

    moves.push(this.endTurnMove())
    console.timeEnd()
    return moves
  }

  computeCardModifications(battlefieldCards: Material) {
    const modifications: Record<number, CardModification> = {}
    for (const cardIndex of battlefieldCards.getIndexes()) {
      const adjacentCards = battlefieldCards
        .filter((other) => areAdjacent(
          this.material(MaterialType.FactionCard).index(cardIndex).getItem()!,
          other
        ))
        .getIndexes()

      for (const adjacentCard of adjacentCards) {
        const rule = getFactionCardRule(this.game, adjacentCard)
        const effect = rule.effect()
        if (!effect) continue
        this.applyModification(modifications, effect, cardIndex)
      }
    }
    return modifications
  }

  applyModification(modifications: Record<number, CardModification>, effect: EffectRule, cardIndex: number) {
    const modification = effect.getModification(cardIndex)
    if (!modification) return
    const existingModification = modifications[cardIndex] ?? {}

    existingModification.attack = (existingModification.attack ?? 0) + (modification.attack ?? 0)
    existingModification.defense = (existingModification.defense ?? 0) + (modification.defense ?? 0)
    existingModification.looseSkill = existingModification.looseSkill ?? modification.looseSkill
    existingModification.looseAllAttributes = existingModification.looseAllAttributes ?? modification.looseAllAttributes
    modifications[cardIndex] = existingModification
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

  canMoveOrUseAction = (cardIndex: number) => {
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

    /*const _modifications = this.computeCardModifications(
      this.material(MaterialType.FactionCard).location(onBattlefieldAndAstralPlane)
    )*/

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
      const modifications = this.computeCardModifications(
        this.material(MaterialType.FactionCard).location(onBattlefieldAndAstralPlane)
      )

      const rule = getFactionCardRule(this.game, move.data.card)

      const attackRule = rule.attack()
      const attackConsequences = attackRule ? attackRule.attack(move.data.targets, modifications) : []
      const deadOpponents = attackConsequences.filter(this.isDiscardFactionCard)
      if (deadOpponents.length === move.data.targets.length) {
        attackConsequences.push(this.rules().customMove(CustomMoveType.SolveAttack))
      }

      delete this.game.droppedItem

      this.memorizeCardPlayed({
        card: move.data.card,
        targets: move.data.targets,
        omnistrike: getFactionCardDescription(card.id.front).hasOmnistrike()
      })
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

    if (move.type === CustomMoveType.CardAction) {
      const rule = getFactionCardRule(this.game, move.data.card)
      return rule.actionRule()
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
