import { adjacent, allied, creature } from '../base/AbilityTargetFilter'
import { Land } from '../base/Land'
import { Faction } from '../../../../Faction'
import { gainAttributes } from '../base/Ability'
import { regeneration } from '../base/Attribute'

export class TreeOfLife extends Land {
  faction = Faction.Nakka
  value = 12

  defense = 4

  benefit = gainAttributes(regeneration).to(adjacent, allied, creature)
}
