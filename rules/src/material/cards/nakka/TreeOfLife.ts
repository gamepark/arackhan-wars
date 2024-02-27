import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { Land } from '../Land'
import { Faction } from '../../Faction'
import { gainAttribute } from '../Ability'
import { regeneration } from '../Attribute'

export class TreeOfLife extends Land {
  faction = Faction.Nakka
  value = 12

  defense = 4

  benefit = gainAttribute(regeneration).to(adjacent, allied, creature)
}
