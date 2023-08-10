import { adjacent, allied, creature, land, or } from '../base/AbilityTargetFilter'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { defense } from '../base/Ability'

export class WinterProtects extends Spell {
  faction = Faction.Whitelands
  value = 3

  effect = defense(+2).to(adjacent, allied, or(creature, land))
}
