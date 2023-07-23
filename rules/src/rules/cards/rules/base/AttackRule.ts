import { CustomMove, Material, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { CardAttributeType, DiscardTiming, FactionCardKind } from '../../descriptions/base/FactionCardDetail'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { ActivatedCard, ActivationRuleMemory } from '../../../types'
import { GamePlayerMemory } from '../../../../ArackhanWarsSetup'
import { isAttackAttribute } from '../attribute/AttackAttribute'
import { FactionCardEffectHelper } from '../helper/FactionCardEffectHelper'
import { discardCard, discardSpells } from '../../../../utils/discard.utils'
import { areAdjacent } from '../../../../utils/adjacent.utils'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { computeAttack } from '../../../../utils/attack.utils'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { isSpell } from '../../descriptions/base/Spell'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import uniq from 'lodash/uniq'
import { deactivateTokens } from '../../../../utils/activation.utils'
import { RuleId } from '../../../RuleId'

export class AttackRule extends PlayerTurnRule {
  private readonly effectHelper: FactionCardEffectHelper

  constructor(game: MaterialGame,
              effectHelper?: FactionCardEffectHelper) {
    super(game)
    this.effectHelper = effectHelper ?? new FactionCardEffectHelper(game)
  }


  getPlayerMoves(): MaterialMove[] {
    const battlefieldCards = this
      .material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)

    const attackers = battlefieldCards.player(this.player)
    const opponents = battlefieldCards.player((player) => player !== this.player)

    const moves: MaterialMove[] = []
    for (const attacker of attackers.getIndexes()) {
      moves.push(...this.getAttacks(attacker, opponents))
    }

    const { activatedCards = [] } = this.getPlayerMemory<ActivationRuleMemory>()
    if (activatedCards.some((a) => a.targets)) {
      moves.push(this.rules().customMove(CustomMoveType.SolveAttack))
    }

    return moves
  }

  getAttacks(attacker: number, opponentsCards: Material): MaterialMove[] {
    if (!this.canAttack(attacker)) return []

    const cardMaterial = this.material(MaterialType.FactionCard).index(attacker)
    // filter the list of opponent in order to check if card can participate to group attack
    const filteredOpponents = this.getAuthorizedTargets(cardMaterial, opponentsCards)
    const card = cardMaterial.getItem()!
    const cardDescription = getFactionCardDescription(card.id.front)
    if (!cardDescription.canAttack()) return []

    const attributeAttacks = cardDescription.getAttributes()
      .filter(isAttackAttribute)
      .filter((a) => !this.effectHelper.hasLostAttributes(attacker, a.type))
      .flatMap((attribute) => attribute.getAttributeRule(this.game).getLegalAttacks(cardMaterial, opponentsCards.indexes(filteredOpponents), this.effectHelper))

    if (attributeAttacks.length) {
      return attributeAttacks
    }

    const moves = []
    for (const cardIndex of filteredOpponents) {
      if (!areAdjacent(cardMaterial, opponentsCards.index(cardIndex))) continue
      moves.push(this.rules().customMove(CustomMoveType.Attack, { card: attacker, target: cardIndex }))
    }

    return moves
  }

  getAuthorizedTargets(attacker: Material, opponentCards: Material): number[] {
    const attackerIndex = attacker.getIndex()
    const { activatedCards = [] } = this.getMemory<ActivationRuleMemory>(this.player)
    if (!activatedCards.length || !activatedCards.some((a) => a.targets)) return opponentCards
      .filter((item) => !isSpell(getFactionCardDescription(item.id.front)))
      .getIndexes()

    return opponentCards.getIndexes().filter((o) => {
      const opponentMaterial = this.material(MaterialType.FactionCard).index(o)

      if (isSpell(getFactionCardDescription(opponentMaterial.getItem()!.id.front))
        || !this.effectHelper.canAttack(attackerIndex, o)) return false

      return activatedCards.some((a) => {
        if (!(a.targets ?? []).includes(o)) return false
        const cardMaterial = this.material(MaterialType.FactionCard).index(a.card)
        const cardDescription = getFactionCardDescription(cardMaterial.getItem()!.id.front)
        if (cardDescription.hasRangeAttack()) return true
        return areAdjacent(attacker, opponentMaterial) && areAdjacent(cardMaterial, opponentMaterial)
      })
    })
  }

  canAttack = (cardIndex: number) => {
    const card = this.material(MaterialType.FactionCard).index(cardIndex)
    if (!this.isActive(card)) return false
    const { activatedCards = [] } = this.getMemory<ActivationRuleMemory>(this.player)

    // For cards that can attack, verify that it was not activated
    const activatedCardIndex = activatedCards.findIndex((card) => card.card === cardIndex)
    if (activatedCardIndex === -1) return true
    // If the card is not the last one in the array, can't attack
    if (activatedCardIndex !== (activatedCards.length - 1)) return false

    const activatedCard = activatedCards[activatedCardIndex]
    return activatedCard.targets === undefined && activatedCard.omnistrike === undefined
  }

  isActive(cardMaterial: Material): boolean {
    // Spell is always considered activable
    const card = cardMaterial.getItem()!
    const cardDescription = getFactionCardDescription(card.id.front)

    const isInitiativeRule = this.game.rule!.id === RuleId.InitiativeActivationRule
    if (isInitiativeRule && (!cardDescription.hasInitiative() || this.effectHelper.hasLostAttributes(cardMaterial.getIndex(), CardAttributeType.Initiative))) return false
    if (isSpell(cardDescription)) return true

    // Other cards are activable if there is a non returned token on it
    return !!this
      .material(MaterialType.FactionToken)
      .parent(cardMaterial.getIndex())
      .rotation((rotation) => !rotation?.y)
      .length
  }

  attack(opponent: number): MaterialMove[] {
    const opponentMaterial = this.material(MaterialType.FactionCard).index(opponent)
    const opponentCardDescription = getFactionCardDescription(opponentMaterial.getItem()!.id.front)
    const { activatedCards = [] } = this.getMemory<ActivationRuleMemory>(this.player)

    const attacksOnThisOpponent = activatedCards.filter((a) => (a.targets ?? []).includes(opponent))
    let attackValue = 0
    const moves = []
    for (const attack of attacksOnThisOpponent) {
      const attackerCard = this.material(MaterialType.FactionCard).index(attack.card)
      attackValue += computeAttack(this.game, attackerCard, opponentMaterial, this.effectHelper, activatedCards)
    }

    const opponentDefense = this.effectHelper.getDefense(opponent)
    if (opponentDefense >= attackValue) return []

    if (opponentCardDescription.kind !== FactionCardKind.Land) {
      const opponentCardToken = this.material(MaterialType.FactionToken).parent(opponent)
      moves.push(...discardCard(opponentMaterial, opponentCardToken))
    } else {
      moves.push(...this.conquerLand(opponent))
    }


    moves.push(
      ...activatedCards.flatMap((a) => this.effectHelper.afterAttack(a.card))
    )


    return moves
  }

  conquerLand(opponentIndex: number): MaterialMove[] {
    const opponentCard = this.material(MaterialType.FactionCard).index(opponentIndex).getItem()!
    opponentCard.location.player = this.player

    return [
      this.material(MaterialType.FactionToken).parent(opponentIndex).deleteItem(),
      this.material(MaterialType.FactionToken).parent(opponentIndex).createItem({
        // Must be the faction instead of the player
        id: this.getGameMemory<GamePlayerMemory>(this.player)!.faction,
        location: { parent: opponentIndex, type: LocationType.FactionTokenSpace, player: this.player }
      })

    ]
  }

  onCustomMove(move: CustomMove): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (move.type === CustomMoveType.Attack) {
      //const attackerMaterial = this.material(MaterialType.FactionCard).index(move.data.card)
      //const card = attackerMaterial.getItem()!
      //const cardDescription = getFactionCardDescription(card.id.front)

      delete this.game.droppedItem

      const battlefieldCards = this
        .material(MaterialType.FactionCard)
        .location(onBattlefieldAndAstralPlane)


      const cardMaterial = this.material(MaterialType.FactionCard).index(move.data.card)

      const opponentMaterial = this.material(MaterialType.FactionCard).index(move.data.target)
      const opponents = battlefieldCards.player((player) => player !== this.player)
      const filteredOpponents = this.getAuthorizedTargets(cardMaterial, opponents)

      const cardDescription = getFactionCardDescription(cardMaterial.getItem()!.id.front)
      const attributeTargets = cardDescription.getAttributes().filter(isAttackAttribute)
        .filter((a) => !this.effectHelper.hasLostAttributes(move.data.card, a.type))
        .flatMap((attribute) => attribute.getAttributeRule(this.game).getTargets(cardMaterial, opponentMaterial, opponents.indexes(filteredOpponents)))

      const targets = uniq(attributeTargets.length ? attributeTargets : [move.data.target])
      this.memorizeCardPlayed({
        card: move.data.card,
        targets: targets
      })
    }


    if (move.type === CustomMoveType.SolveAttack) {
      return this.solveAttack()
    }

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

    for (const target of targets) {
      // Attacks must be added first, then all discard and deactivation moves
      moves.unshift(...this.attack(target))
    }

    this.memorize<ActivationRuleMemory>({ activatedCards: [] }, this.player)
    return moves
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
}
