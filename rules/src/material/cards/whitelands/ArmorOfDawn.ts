import { Faction } from '../../Faction'
import { defense } from '../Ability'
import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { Spell } from '../Spell'

export class ArmorOfDawn extends Spell {
  faction = Faction.Whitelands
  value = 5
  holo = true

  astral = true

  effect = defense(+1).to(allied, creature).forEach(adjacent, allied, creature)
}
