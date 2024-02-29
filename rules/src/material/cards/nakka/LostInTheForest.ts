import { Faction } from '../../Faction'
import { canOnlyAttack } from '../Ability'
import { creature, enemy } from '../AbilityTargetFilter'
import { AttackCondition } from '../AttackLimitation'
import { Spell } from '../Spell'

export class LostInTheForest extends Spell {
  faction = Faction.Nakka
  value = 3

  astral = true

  effect = canOnlyAttack(AttackCondition.ByCreaturesInGroup).to(enemy, creature)
}
