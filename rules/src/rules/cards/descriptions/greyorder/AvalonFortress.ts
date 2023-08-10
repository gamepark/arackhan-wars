import { adjacent, allied, creature } from '../base/AbilityTargetFilter'
import { Land } from '../base/Land'
import { Faction } from '../../../../Faction'
import { attack } from '../base/Ability'

export class AvalonFortress extends Land {
  faction = Faction.GreyOrder
  value = 10

  defense = 4

  benefit = attack(+1).defense(+1).to(adjacent, allied, creature)
}
