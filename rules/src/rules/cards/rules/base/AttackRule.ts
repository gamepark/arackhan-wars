import { CustomMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { discardCard } from '../../../../utils/discard.utils'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { isSpell } from '../../descriptions/base/Spell'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import uniq from 'lodash/uniq'
import mapValues from 'lodash/mapValues'
import partition from 'lodash/partition'
import { isLand } from '../../descriptions/base/Land'
import { Memory } from '../../../Memory'
import { getCardRule } from './CardRule'

export type Attack = {
  card: number
  targets: number[]
  omnistrike?: boolean
}

export class AttackRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
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

  onCustomMove(move: CustomMove): MaterialMove<PlayerId, MaterialType, LocationType>[] {
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

  solveAttack(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const attacks = this.remind<Attack[]>(Memory.Attacks)

    moves.push(...this.material(MaterialType.FactionToken)
      .parent(parent => attacks.some(attack => attack.card === parent))
      .moveItems({ rotation: { y: 1 } }))

    const attackValues = this.attackValues
    const defeatedEnemies = Object.keys(attackValues).map(key => parseInt(key))
      .filter(enemy => attackValues[enemy] > getCardRule(this.game, enemy).defense)
    const [regeneratingEnemies, killedEnemies] = partition(defeatedEnemies, enemy =>
      getCardRule(this.game, enemy).canRegenerate && !attacks.some(attack => attack.targets.includes(enemy) && getCardRule(this.game, attack.card).isSpell)
    )
    for (const regeneratingEnemy of regeneratingEnemies) {
      moves.push(this.material(MaterialType.FactionToken).parent(regeneratingEnemy).moveItem({ rotation: { y: 1 } }))
    }
    for (const killedEnemy of killedEnemies) {
      moves.push(...this.onSuccessfulAttack(killedEnemy))
    }
    for (const attack of attacks) {
      const cardRule = getCardRule(this.game, attack.card)
      let attackFailed = attack.targets.some(target => !defeatedEnemies.includes(target))

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
                .location(location => location.type === LocationType.Battlefield && location.x === x && location.y === y)
                .player(player => player !== this.player)
                .filter((_, index) => !isSpell(getCardRule(this.game, index).characteristics) && !killedEnemies.includes(index))
              if (nextEnemy.length) {
                const enemyIndex = nextEnemy.getIndex()
                const defender = getCardRule(this.game, enemyIndex)
                if (attackValue > defender.defense) {
                  if (!cardRule.isSpell && defender.canRegenerate) {
                    moves.push(this.material(MaterialType.FactionToken).parent(enemyIndex).moveItem({ rotation: { y: 1 } }))
                  } else {
                    moves.push(...this.onSuccessfulAttack(enemyIndex))
                  }
                  attackValue--
                  x = x + delta.x
                  y = y + delta.y
                } else {
                  attackFailed = true
                  attackValue = -1
                }
              } else {
                attackValue = -1
              }
            }
          }
        }
      }

      if (attackFailed) {
        moves.push(...cardRule.triggerFailAttackEffects())
      }
    }

    moves.push(...this.material(MaterialType.FactionCard)
      .filter((_, index) => attacks.some(attack => attack.card === index) && getCardRule(this.game, index).isSpell)
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

  conquerLand(opponentIndex: number): MaterialMove[] {
    const opponentCard = this.material(MaterialType.FactionCard).index(opponentIndex).getItem()!
    opponentCard.location.player = this.player

    return [
      this.material(MaterialType.FactionToken).parent(opponentIndex).deleteItem(),
      this.material(MaterialType.FactionToken).parent(opponentIndex).createItem({
        id: this.remind(Memory.Token, this.player),
        location: { parent: opponentIndex, type: LocationType.FactionTokenSpace, player: this.player }
      })

    ]
  }
}
