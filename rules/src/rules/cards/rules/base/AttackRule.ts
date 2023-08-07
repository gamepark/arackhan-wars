import { CustomMove, Material, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { DiscardTiming } from '../../descriptions/base/FactionCardCharacteristics'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { isAttackAttribute } from '../attribute/AttackAttribute'
import { FactionCardInspector } from '../helper/FactionCardInspector'
import { discardCard, discardSpells } from '../../../../utils/discard.utils'
import { areAdjacentCards } from '../../../../utils/adjacent.utils'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { computeAttack } from '../../../../utils/attack.utils'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { isSpell } from '../../descriptions/base/Spell'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import uniq from 'lodash/uniq'
import { deactivateTokens } from '../../../../utils/activation.utils'
import { isLand } from '../../descriptions/base/Land'
import { Memory } from '../../../Memory'
import { getCardRule } from './CardRule'

export type Attack = {
  card: number
  targets: number[]
  omnistrike?: boolean
}

export class AttackRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  private readonly cardInspector: FactionCardInspector

  constructor(game: MaterialGame) {
    super(game)
    this.cardInspector = new FactionCardInspector(game)
  }

  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []

    const cardsAlreadyAttacked = this.cardsAlreadyAttacked
    const potentialTargets = cardsAlreadyAttacked.length > 0 ? cardsAlreadyAttacked
      : this.material(MaterialType.FactionCard)
        .location(LocationType.Battlefield)
        .player(player => player !== this.player)
        .getIndexes()
        .filter(index => getCardRule(this.game, index).canBeAttacked)

    for (const card of this.potentialAttackers) {
      const attackerRules = getCardRule(this.game, card)
      for (const target of potentialTargets) {
        if (attackerRules.canAttackTarget(target)) {
          moves.push(this.rules().customMove(CustomMoveType.Attack, { card, target })) // TODO: only 1 legal move for Omnistrick, without a target
        }
      }
    }

    if (cardsAlreadyAttacked && !this.remind<number[]>(Memory.MovedCards).length) {
      moves.push(this.rules().customMove(CustomMoveType.SolveAttack))
    }

    return moves
  }

  get potentialAttackers() {
    const movedCards = this.remind<number[]>(Memory.MovedCards)
    if (movedCards.length) return [movedCards[0]]
    const attacks = this.remind<Attack[]>(Memory.Attacks)
    return this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)
      .getIndexes()
      .filter(index =>
        getCardRule(this.game, index).canAttack && !attacks.some(attack => attack.card === index)
      )
  }

  get cardsAlreadyAttacked() {
    const attacks = this.remind<Attack[]>(Memory.Attacks)
    return uniq(attacks.flatMap(attacks => attacks.targets))
  }

  getAuthorizedTargets(attacker: Material, opponentCards: Material): number[] {
    const attackerIndex = attacker.getIndex()
    const attacks = this.remind<Attack[]>(Memory.Attacks)

    return opponentCards.getIndexes().filter((o) => {
      const opponentCharacteristics = getCardRule(this.game, o).characteristics
      const opponentMaterial = this.material(MaterialType.FactionCard).index(o)

      if (isSpell(getCardRule(this.game, o).characteristics)
        || !this.cardInspector.canAttack(attackerIndex, o)) return false

      if (!attacks.length) return true

      return attacks.some(attack => {
        if (!attack.targets.includes(o)) return false
        const cardMaterial = this.material(MaterialType.FactionCard).index(attack.card)
        const characteristics = getCardRule(this.game, attack.card).characteristics
        if (characteristics.hasRangeAttack() || opponentCharacteristics.hasRangeAttack()) return true
        return areAdjacentCards(attacker, opponentMaterial) && areAdjacentCards(cardMaterial, opponentMaterial)
      })
    })
  }

  attack(opponent: number): MaterialMove[] {
    const opponentMaterial = this.material(MaterialType.FactionCard).index(opponent)
    const opponentCardCharacteristics = getCardRule(this.game, opponent).characteristics
    const attacks = this.remind<Attack[]>(Memory.Attacks)

    const attacksOnThisOpponent = attacks.filter(attack => attack.targets.includes(opponent))
    let attackValue = 0
    const moves = []
    for (const attack of attacksOnThisOpponent) {
      const attackerCard = this.material(MaterialType.FactionCard).index(attack.card)
      attackValue += computeAttack(attackerCard, opponentMaterial, this.cardInspector, attacks)
    }

    const opponentDefense = this.cardInspector.getDefense(opponent)
    if (opponentDefense >= attackValue) return []

    if (isLand(opponentCardCharacteristics)) {
      moves.push(...this.conquerLand(opponent))
    } else {
      const opponentCardToken = this.material(MaterialType.FactionToken).parent(opponent)
      moves.push(...discardCard(opponentMaterial, opponentCardToken))
    }


    moves.push(
      ...attacks.flatMap(attacks => this.cardInspector.afterAttack(attacks.card))
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
        id: this.remind(Memory.Token, this.player),
        location: { parent: opponentIndex, type: LocationType.FactionTokenSpace, player: this.player }
      })

    ]
  }

  onCustomMove(move: CustomMove): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    if (move.type === CustomMoveType.Attack) {

      delete this.game.droppedItem

      const battlefieldCards = this
        .material(MaterialType.FactionCard)
        .location(onBattlefieldAndAstralPlane)

      const cardMaterial = this.material(MaterialType.FactionCard).index(move.data.card)

      const opponentMaterial = this.material(MaterialType.FactionCard).index(move.data.target)
      const opponents = battlefieldCards.player((player) => player !== this.player)
      const filteredOpponents = this.getAuthorizedTargets(cardMaterial, opponents)

      const characteristics = getCardRule(this.game, move.data.card).characteristics
      const attributeTargets = characteristics.getAttributes().filter(isAttackAttribute)
        .filter((a) => !this.cardInspector.hasLostAttributes(move.data.card, a.type))
        // In case of omnistrike, opponentMaterial is empty, but the attribute don't care about opponent since its all adjacent enemies
        .flatMap((attribute) => attribute.getAttributeRule(this.game).getTargets(cardMaterial, opponentMaterial, opponents.indexes(filteredOpponents)))

      const targets = attributeTargets.length ? uniq(attributeTargets) : [move.data.target]
      this.memorize<number[]>(Memory.MovedCards, movedCard => movedCard.filter(card => card !== move.data.card))
      this.memorize<Attack[]>(Memory.Attacks, attacks => [...attacks, { card: move.data.card, targets }])
    }

    if (move.type === CustomMoveType.SolveAttack) {
      return this.solveAttack()
    }

    return []
  }

  solveAttack(): MaterialMove[] {

    const attacks = this.remind<Attack[]>(Memory.Attacks)
    let targets: number[] = []
    const moves: MaterialMove[] = []

    const battlefieldCards = this
      .material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
    const opponents = battlefieldCards.player((player) => player !== this.player)

    for (const attack of attacks) {
      const cardMaterial = this.material(MaterialType.FactionCard).index(attack.card)
      const targetsMaterial = opponents.indexes(attack.targets)
      const characteristics = getCardRule(this.game, attack.card).characteristics
      const attributeTargets = characteristics.getAttributes().filter(isAttackAttribute)
        .filter(attribute => !this.cardInspector.hasLostAttributes(attack.card, attribute.type))
        .flatMap(attribute => attribute.getAttributeRule(this.game).getConsecutiveTargets(cardMaterial, targetsMaterial, opponents))

      targets = uniq([...targets, ...(attributeTargets ?? [])])

      const attackerMaterial = this.material(MaterialType.FactionCard).index(attack.card)
      moves.push(
        ...discardSpells(this.game, attackerMaterial, DiscardTiming.ActivationOrEndOfTurn)
      )

      const token = this.material(MaterialType.FactionToken).parent(attack.card)
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

    this.memorize(Memory.MovedCards, [])
    this.memorize(Memory.Attacks, [])
    return moves
  }
}
