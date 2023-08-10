import { adjacent, allied, creature } from '../base/AbilityTargetFilter'
import { Land } from '../base/Land'
import { Faction } from '../../../../Faction'
import { defense } from '../base/Ability'

export class FortressOfMyjir extends Land {
  faction = Faction.Whitelands
  value = 10

  defense = 4

  benefit = defense(+2).to(adjacent, allied, creature)
}
