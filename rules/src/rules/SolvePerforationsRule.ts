import { MaterialMove, MaterialRulesPart, XYCoordinates } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'
import { isSpell } from '../material/cards/Spell'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { AttackRule } from './AttackRule'
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

export class SolvePerforationsRule extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {
  onRuleStart(): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const moves: MaterialMove[] = []
    const perforations = this.remind<Perforation[]>(Memory.Perforations)
    const nextPerforations: Perforation[] = []
    for (const perforation of perforations) {
      const attacker = getCardRule(this.game, perforation.attacker)
      const attackerLocation = attacker.item.location
      if (attackerLocation.type !== LocationType.Battlefield) continue
      const target = this.material(MaterialType.FactionCard)
        .location(location => location.type === LocationType.Battlefield && location.x === perforation.x && location.y === perforation.y)
        .player(player => player !== this.game.rule!.player!)
        .filter((_, index) => !isSpell(getCardRule(this.game, index).characteristics))
      if (!target.length) continue
      const targetIndex = target.getIndex()
      if (attacker.someEffectPreventsAttacking(targetIndex)) continue
      const defender = getCardRule(this.game, targetIndex)
      if (perforation.attackValue > defender.defense) {
        if (!attacker.isSpell && defender.canRegenerate) {
          moves.push(this.material(MaterialType.FactionToken).parent(targetIndex).moveItem({ rotation: { y: 1 } }))
        } else {
          moves.push(...new AttackRule(this.game).onSuccessfulAttack(targetIndex))
        }
        if (perforation.attackValue > 0) {
          const nextPerforation: Perforation = { ...perforation, attackValue: perforation.attackValue - 1 }
          if (attackerLocation.x! > perforation.x!) nextPerforation.x--
          else if (attackerLocation.x! < perforation.x!) nextPerforation.x++
          else if (attackerLocation.y! > perforation.y!) nextPerforation.y--
          else if (attackerLocation.y! < perforation.y!) nextPerforation.y++
          nextPerforations.push(nextPerforation)
        }
      } else {
        moves.push(...attacker.triggerFailAttackEffects())
      }
    }

    if (nextPerforations.length > 0) {
      this.memorize(Memory.Perforations, nextPerforations)
      moves.push(this.rules().startRule(RuleId.SolvePerforations))
    } else {
      this.forget(Memory.Perforations)
      moves.push(this.rules().startRule(RuleId.ActivationRule))
    }

    return moves
  }
}