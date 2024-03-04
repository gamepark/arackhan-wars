import { Faction } from '../../Faction'
import { cannotAttack, canOnlyAttack } from '../Ability'
import { creature, enemy } from '../AbilityTargetFilter'
import { AttackCondition, AttackLimitation } from '../AttackLimitation'
import { Spell } from '../Spell'

export class TheFog extends Spell {
  faction = Faction.Blight
  value = 3

  astral = true

  effects = [
    canOnlyAttack(AttackCondition.CreaturesIfAdjacent).to(enemy, creature),
    cannotAttack(AttackLimitation.InGroup).to(enemy, creature)
  ]
}
