import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { Land } from '../Land'
import { Faction } from '../../Faction'
import { defense } from '../Ability'

export class FortressOfMyjir extends Land {
  faction = Faction.Whitelands
  value = 10

  defense = 4

  benefit = defense(+2).to(adjacent, allied, creature)
}
