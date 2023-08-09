import { adjacent, allied, creature, land, or } from '../utils/applicable-filter.utils'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { AttackLimitation } from '../base/AttackLimitation'
import { canOnlyBeAttackedBy } from '../base/Ability'

export class NaturalCamouflage extends Spell {
  faction = Faction.Nakka
  limit = 2
  value = 3

  effect = canOnlyBeAttackedBy(AttackLimitation.NoCreature).to(adjacent, allied, or(creature, land))
}
