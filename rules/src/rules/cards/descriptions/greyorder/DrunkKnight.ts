import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { canOnlyAttack } from '../base/Ability'
import { AttackCondition } from '../base/AttackLimitation'

export class DrunkKnight extends Creature {
  faction = Faction.GreyOrder
  value = 1

  attack = 1
  defense = 1

  weakness = canOnlyAttack(AttackCondition.EvenValueCards)
}
