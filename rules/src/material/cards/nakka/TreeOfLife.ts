import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { Land } from '../Land'
import { Faction } from '../../Faction'
import { gainAttributes } from '../Ability'
import { regeneration } from '../Attribute'

export class TreeOfLife extends Land {
  faction = Faction.Nakka
  value = 12

  defense = 4

  benefit = gainAttributes(regeneration).to(adjacent, allied, creature)
}
