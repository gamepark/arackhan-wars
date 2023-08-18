import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { canOnlyAttack } from '../Ability'
import { AttackCondition } from '../AttackLimitation'

export class DrunkKnight extends Creature {
  faction = Faction.GreyOrder
  value = 1

  attack = 1
  defense = 1

  weakness = canOnlyAttack(AttackCondition.EvenValueCards)
}
