import { FactionCard } from '../../../../material/FactionCard'
import { rangedAttack } from '../../rules/attribute'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'

export class Ballista extends Creature {
  id = FactionCard.Ballista
  faction = Faction.GrayOrder
  family = 'artillery'

  value = 5
  attack = 1
  defense = 1

  attribute = rangedAttack(3)

  quantity = 2
}
