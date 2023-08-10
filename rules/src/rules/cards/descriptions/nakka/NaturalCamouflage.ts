import { adjacent, allied, creature, land, or } from '../base/AbilityTargetFilter'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { AttackLimitation } from '../base/AttackLimitation'
import { cannotBeAttacked } from '../base/Ability'

export class NaturalCamouflage extends Spell {
  faction = Faction.Nakka
  limit = 2
  value = 3

  effect = cannotBeAttacked(AttackLimitation.ByCreatures).to(adjacent, allied, or(creature, land))
}
