import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { Faction } from '../../Faction'
import { Land } from '../Land'
import { attack } from '../Ability'

export class WesternForge extends Land {
  faction = Faction.Blight
  value = 10

  defense = 4

  benefit = attack(+2).to(adjacent, allied, creature)
}
