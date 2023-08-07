import { CustomMove, Material, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { isAttackAttribute } from '../attribute/AttackAttribute'
import { FactionCardInspector } from '../helper/FactionCardInspector'
import { discardCard } from '../../../../utils/discard.utils'
import { areAdjacentCards } from '../../../../utils/adjacent.utils'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { isSpell } from '../../descriptions/base/Spell'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import uniq from 'lodash/uniq'
import mapValues from 'lodash/mapValues'
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

    if (cardsAlreadyAttacked.length > 0 && !this.remind<number[]>(Memory.MovedCards).length) {
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
    const moves: MaterialMove[] = []
    const attacks = this.remind<Attack[]>(Memory.Attacks)

    moves.push(...this.material(MaterialType.FactionToken)
      .parent(parent => attacks.some(attack => attack.card === parent))
      .moveItems({ rotation: { y: 1 } }))

    const attackValues = this.attackValues
    const defeatedEnemies = Object.keys(attackValues).map(key => parseInt(key))
      .filter(enemy => attackValues[enemy] > getCardRule(this.game, enemy).defense)
    for (const defeatedEnemy of defeatedEnemies) {
      moves.push(...this.onSuccessfulAttack(defeatedEnemy))
    }
    for (const attack of attacks) {
      // TODO: trigger failed attack effects (child eater)

      const cardRule = getCardRule(this.game, attack.card)
      if (cardRule.hasPerforation) {
        const cardLocation = cardRule.item.location
        for (const target of attack.targets) {
          if (defeatedEnemies.includes(target)) {
            const enemyLocation = this.material(MaterialType.FactionCard).getItem(target)!.location
            const delta = { x: enemyLocation.x! - cardLocation.x!, y: enemyLocation.y! - cardLocation.y! }
            let attackValue = cardRule.attack - 1
            let x = enemyLocation.x! + delta.x, y = enemyLocation.y! + delta.y
            while (attackValue >= 0) {
              const nextEnemy = this.material(MaterialType.FactionCard)
                .location(location => location.type === LocationType.Battlefield && location.x === x && location.x === y)
                .player(player => player !== player)
                .filter((_, index) => !isSpell(getCardRule(this.game, index).characteristics) && !defeatedEnemies.includes(index))
              if (nextEnemy.length) {
                const enemyIndex = nextEnemy.getIndex()
                const defense = getCardRule(this.game, enemyIndex).defense
                if (attackValue > defense) {
                  moves.push(...this.onSuccessfulAttack(enemyIndex))
                  attackValue--
                  x = x + delta.x
                  y = y + delta.y
                } else {
                  // TODO: trigger failed attack effects (child eater)
                  attackValue = -1
                }
              } else {
                attackValue = -1
              }
            }
          }
        }
      }
    }

    moves.push(...this.material(MaterialType.FactionCard)
      .filter((_, index) => attacks.some(attack => attack.card === index) && isSpell(getCardRule(this.game, index).characteristics))
      .moveItems({ location: { type: LocationType.PlayerDiscard, player: this.player } })
    )

    this.memorize(Memory.Attacks, [])

    return moves
  }

  /**
   * @return values of all the attacks declared, excluding perforations
   * When attacks cannot be grouped, only the best value is kept
   */
  get attackValues(): Record<number, number> {
    const attackedBy: Record<number, number[]> = {}
    const attacks = this.remind<Attack[]>(Memory.Attacks)
    for (const attack of attacks) {
      for (const target of attack.targets) {
        if (!(target in attackedBy)) attackedBy[target] = []
        attackedBy[target].push(attack.card)
      }
    }
    return mapValues(attackedBy, (attackers, card) => getCardRule(this.game, parseInt(card)).getAttackValue(attackers))
  }

  onSuccessfulAttack(enemy: number) {
    if (isLand(getCardRule(this.game, enemy).characteristics)) {
      return this.conquerLand(enemy)
    } else {
      const opponentCardToken = this.material(MaterialType.FactionToken).parent(enemy)
      return discardCard(this.material(MaterialType.FactionCard).index(enemy), opponentCardToken)
    }
  }
}
