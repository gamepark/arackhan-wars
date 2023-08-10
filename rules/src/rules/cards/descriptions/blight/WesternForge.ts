import { adjacent, allied, creature } from '../base/AbilityTargetFilter'
import { Faction } from '../../../../Faction'
import { Land } from '../base/Land'
import { attack } from '../base/Ability'

export class WesternForge extends Land {
  faction = Faction.Blight
  value = 10

  defense = 4

  benefit = attack(+2).to(adjacent, allied, creature)
}
