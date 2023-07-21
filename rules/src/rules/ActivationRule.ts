import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { CustomMove, ItemMove, ItemMoveType, Material, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { CustomMoveType } from '../material/CustomMoveType'
import { getFactionCardDescription } from '../material/FactionCard'
import { RuleId } from './RuleId'
import { onBattlefieldAndAstralPlane } from '../utils/LocationUtils'
import { ActivatedCard, ActivationRuleMemory } from './types'
import { CardAttributeType, DiscardTiming } from './cards/descriptions/base/FactionCardDetail'
import { AttackRule } from './cards/rules/base/AttackRule'
import { MoveRules } from './cards/rules/base/MoveRules'
import { discardSpells } from '../utils/discard.utils'
import { isSpell } from './cards/descriptions/base/Spell'
import { deactivateTokens } from '../utils/activation.utils'
import { FactionCardEffectHelper } from './cards/rules/helper/FactionCardEffectHelper'
import uniq from 'lodash/uniq'


export class ActivationRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  initiative = false

  getPlayerMoves(): MaterialMove[] {
    const battlefieldCards = this
      .material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)

    const effectHelper = new FactionCardEffectHelper(this.game)

    const playerCards = battlefieldCards.player(this.player)
    const opponentsCards = battlefieldCards.player((player) => player !== this.player)

    // Playable cards are those that can be place in this phase (initiative or not)
    // And with an active token on them
    const playableCards = playerCards.getIndexes()

    const moves: MaterialMove[] = []
    // Compute all attack and move moves
    for (const index of playableCards) {
      const cardMaterial = playerCards.index(index)
      const card = getFactionCardDescription(cardMaterial.getItem()!.id.front)
      if (!this.isActive(cardMaterial, effectHelper)) continue


      if (this.canAttack(index)) {
        moves.push(
          ...new AttackRule(this.game, this.player, effectHelper).getLegalAttacks(index, opponentsCards)
        )
      }

      if (!this.canMoveOrUseAction(index)) continue

      moves.push(
        ...new MoveRules(this.game, cardMaterial, card, index, effectHelper).getLegalMovements()
      )

      /**if (rule.actionRule().length) {
        moves.push(this.rules().customMove(CustomMoveType.CardAction, { card: index }))
      }**/
    }

    const { activatedCards = [] } = this.getPlayerMemory<ActivationRuleMemory>()
    if (activatedCards.length) {
      moves.push(this.rules().customMove(CustomMoveType.SolveAttack))
    }

    moves.push(this.endTurnMove())
    return moves
  }

  isActive(cardMaterial: Material, _effectHelper: FactionCardEffectHelper): boolean {

    // Spell is always considered activable
    const card = cardMaterial.getItem()!
    const factionCard = getFactionCardDescription(card.id.front)
    if (isSpell(factionCard)) return true

    // Other cards are activable if there is a non returned token on it
    return !!this
      .material(MaterialType.FactionToken)
      .parent(cardMaterial.getIndex())
      .rotation((rotation) => !rotation?.y)
      .length
  }

  canAttack = (cardIndex: number) => {
    const { activatedCards = [] } = this.getPlayerMemory<ActivationRuleMemory>()

    // For cards that can attack, verify that it was not activated
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

    // Apply end turn effect on card
    return discardSpells(
      this
        .material(MaterialType.FactionCard)
        .location(onBattlefieldAndAstralPlane)
        .player(this.player),
      DiscardTiming.ActivationOrEndOfTurn
    )
  }

  onCustomMove(move: CustomMove): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (move.type === CustomMoveType.Attack) {
      const attackerMaterial = this.material(MaterialType.FactionCard).index(move.data.card)
      const card = attackerMaterial.getItem()!
      const cardDescription = getFactionCardDescription(card.id.front)
      const effectHelper = new FactionCardEffectHelper(this.game)

      delete this.game.droppedItem

      this.memorizeCardPlayed({
        card: move.data.card,
        targets: move.data.targets,
        // TODO: why ?
        omnistrike: cardDescription.hasOmnistrike() && !effectHelper.hasLostAttributes(move.data.card, CardAttributeType.Omnistrike)
      })
    }

    if (move.type === CustomMoveType.SolveAttack) {
      return this.solveAttack()
    }

    /*if (move.type === CustomMoveType.CardAction) {
      const rule = getFactionCardRule(this.game, move.data.card)
      return rule.actionRule()
    }*/

    return []
  }

  solveAttack(): MaterialMove[] {

    const { activatedCards = [] } = this.getMemory<ActivationRuleMemory>(this.player)
    let targets: number[] = []
    const moves: MaterialMove[] = []
    for (const activation of activatedCards) {
      targets = uniq([...targets, ...(activation.targets ?? [])])

      const attackerMaterial = this.material(MaterialType.FactionCard).index(activation.card)
      moves.push(
        ...discardSpells(attackerMaterial, DiscardTiming.ActivationOrEndOfTurn)
      )

      const token = this.material(MaterialType.FactionToken).parent(activation.card)
      if (token.length) {
        moves.push(
          ...deactivateTokens(token)
        )
      }
    }

    const effectHelper = new FactionCardEffectHelper(this.game)
    const rule = new AttackRule(this.game, this.player, effectHelper)
    for (const target of targets) {
      // Attacks must be added first, then all discard and deactivation moves
      moves.unshift(...rule.attack(target))
    }

    this.memorize<ActivationRuleMemory>({ activatedCards: [] }, this.player)
    return moves
  }

  afterItemMove(move: ItemMove<PlayerId, MaterialType, LocationType>): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const moves: MaterialMove[] = []
    if (move.type !== ItemMoveType.Move || move.itemType !== MaterialType.FactionCard) return []

    if (move.position.location?.type === LocationType.Battlefield) {
      this.memorizeCardPlayed({ card: move.itemIndex })

      const battlefieldCards = this
        .material(MaterialType.FactionCard)
        .location(onBattlefieldAndAstralPlane)
      const opponentsCards = battlefieldCards.player((player) => player !== this.player)
      const effectHelper = new FactionCardEffectHelper(this.game)

      const rule = new AttackRule(this.game, this.player, effectHelper)
      if (!rule.getLegalAttacks(move.itemIndex, opponentsCards)) {
        const token = this.material(MaterialType.FactionToken).parent(move.itemIndex)
        moves.push(...deactivateTokens(token))
      }
    }

    return moves
  }


}
