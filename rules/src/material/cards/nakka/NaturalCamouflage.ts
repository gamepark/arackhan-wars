import { adjacent, allied, creature, land, or } from '../AbilityTargetFilter'
import { Spell } from '../Spell'
import { Faction } from '../../Faction'
import { AttackLimitation } from '../AttackLimitation'
import { cannotBeAttacked } from '../Ability'

export class NaturalCamouflage extends Spell {
  faction = Faction.Nakka
  limit = 2
  value = 3

  effect = cannotBeAttacked(AttackLimitation.ByCreatures).to(adjacent, allied, or(creature, land))
}
