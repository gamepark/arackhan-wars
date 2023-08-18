import { adjacent, allied, creature, land, or } from '../AbilityTargetFilter'
import { Spell } from '../Spell'
import { Faction } from '../../Faction'
import { defense } from '../Ability'

export class WinterProtects extends Spell {
  faction = Faction.Whitelands
  value = 3

  effect = defense(+2).to(adjacent, allied, or(creature, land))
}
