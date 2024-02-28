import { CustomMove, MaterialMove, PlayerTurnRule, XYCoordinates } from '@gamepark/rules-api'
import mapValues from 'lodash/mapValues'
import partition from 'lodash/partition'
import uniq from 'lodash/uniq'
import { onBattlefieldAndAstralPlane } from '../material/Board'
import { isLand } from '../material/cards/Land'
import { CustomMoveType } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getCardRule } from './CardRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export type Attack = {
  card: number
  targets: number[]
  omnistrike?: boolean
}

export type Perforation = {
  attacker: number
  attackValue: number
} & XYCoordinates

export class AttackRule extends PlayerTurnRule {
  getPlayerMoves() {
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
      if (attackerRules.hasOmnistrike) {
        if (potentialTargets.some(target => attackerRules.canAttackTarget(target))) {
          moves.push(this.rules().customMove(CustomMoveType.Attack, { card }))
        }
      } else {
        for (const target of potentialTargets) {
          if (attackerRules.canAttackTarget(target)) {
            moves.push(this.rules().customMove(CustomMoveType.Attack, { card, target }))
          }
        }
      }
    }

    if (cardsAlreadyAttacked.length > 0 && !this.remind<number[]>(Memory.MovedCards).length) {
      moves.push(this.rules().customMove(CustomMoveType.SolveAttack))
    }

    return moves
  }

  get potentialAttackers() {
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

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Attack) {
      delete this.game.droppedItem
      const targets = move.data.target !== undefined ? [move.data.target] : getCardRule(this.game, move.data.card).omnistrikeTargets
      this.memorize<number[]>(Memory.MovedCards, movedCard => movedCard.filter(card => card !== move.data.card))
      this.memorize<Attack[]>(Memory.Attacks, attacks => [...attacks, { card: move.data.card, targets }])
    } else if (move.type === CustomMoveType.SolveAttack) {
      return this.solveAttack()
    }

    return []
  }

  solveAttack() {
    const moves: MaterialMove[] = []
    const attacks = this.remind<Attack[]>(Memory.Attacks)
    const perforations: Perforation[] = []

    moves.push(...this.material(MaterialType.FactionToken)
      .location(LocationType.FactionTokenSpace)
      .parent(parent => attacks.some(attack => attack.card === parent))
      .rotateItems(true))

    const attackValues = this.attackValues
    const defeatedEnemies = Object.keys(attackValues).map(key => parseInt(key))
      .filter(enemy => (attackValues[enemy] ?? 0) > getCardRule(this.game, enemy).defense)
    const [regeneratingEnemies, killedEnemies] = partition(defeatedEnemies, enemy =>
      getCardRule(this.game, enemy).canRegenerate && !attacks.some(attack => attack.targets.includes(enemy) && getCardRule(this.game, attack.card).isSpell)
    )
    for (const regeneratingEnemy of regeneratingEnemies) {
      moves.push(this.material(MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(regeneratingEnemy).rotateItem(true))
    }
    for (const killedEnemy of killedEnemies) {
      moves.push(...this.onSuccessfulAttack(killedEnemy))
    }
    for (const attack of attacks) {
      const cardRule = getCardRule(this.game, attack.card)

      if (cardRule.hasPerforation) {
        const cardLocation = cardRule.item.location
        for (const target of attack.targets) {
          if (defeatedEnemies.includes(target)) {
            const enemyLocation = this.material(MaterialType.FactionCard).getItem(target)!.location
            const delta = { x: enemyLocation.x! - cardLocation.x!, y: enemyLocation.y! - cardLocation.y! }
            const attackValue = cardRule.attack - 1
            if (attackValue >= 0 && Math.abs(delta.x) + Math.abs(delta.y) === 1) {
              const perforation = { attacker: attack.card, x: enemyLocation.x! + delta.x, y: enemyLocation.y! + delta.y, attackValue }
              perforations.push(perforation)
            }
          }
        }
      }

      if (attack.targets.some(target => attackValues[target] !== undefined && !defeatedEnemies.includes(target))) {
        moves.push(...cardRule.triggerFailAttackEffects())
      }
    }

    moves.push(...this.material(MaterialType.FactionCard)
      .filter((_, index) => attacks.some(attack => attack.card === index) && getCardRule(this.game, index).isSpell)
      .moveItems({ type: LocationType.PlayerDiscard, player: this.player })
    )

    if (perforations.length > 0) {
      this.memorize<Perforation[]>(Memory.Perforations, perforations)
      moves.push(this.rules().startRule(RuleId.SolvePerforations))
    } else {
      moves.push(...this.cleanAttacks())
    }

    return moves
  }

  cleanAttacks() {
    const moves: MaterialMove[] = []
    const attacks = this.remind<Attack[]>(Memory.Attacks)
    for (const attack of attacks) {
      moves.push(...getCardRule(this.game, attack.card).triggerAttackEffects())
    }
    this.memorize(Memory.Attacks, [])
    return moves
  }

  /**
   * @return values of all the attacks declared, excluding perforations
   * When attacks cannot be grouped, only the best value is kept
   */
  get attackValues() {
    const attackedBy: Record<number, number[]> = {}
    const attacks = this.remind<Attack[]>(Memory.Attacks)
    for (const attack of attacks) {
      for (const target of attack.targets) {
        if (!(target in attackedBy)) attackedBy[target] = []
        attackedBy[target].push(attack.card)
      }
    }
    return mapValues(attackedBy, (attackers, card) => getCardRule(this.game, parseInt(card)).getDamagesInflicted(attackers))
  }

  onSuccessfulAttack(enemy: number) {
    if (isLand(getCardRule(this.game, enemy).characteristics)) {
      return this.conquerLand(enemy)
    } else {
      const card = this.material(MaterialType.FactionCard).index(enemy)
      return [
        ...this.material(MaterialType.FactionToken).parent(enemy).deleteItems(),
        card.moveItem({ type: LocationType.PlayerDiscard, player: card.getItem()?.location.player })
      ]
    }
  }

  conquerLand(opponentIndex: number) {
    const opponentCard = this.material(MaterialType.FactionCard).index(opponentIndex).getItem()!
    opponentCard.location.player = this.player

    return [
      this.material(MaterialType.FactionToken).parent(opponentIndex).deleteItem(),
      this.material(MaterialType.FactionToken).parent(opponentIndex).createItem({
        id: this.remind(Memory.PlayerFactionToken, this.player),
        location: { parent: opponentIndex, type: LocationType.FactionTokenSpace, player: this.player }
      })

    ]
  }
}
