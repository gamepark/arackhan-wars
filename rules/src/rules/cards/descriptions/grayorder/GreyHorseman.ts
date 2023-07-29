import { FactionCard } from '../../../../material/FactionCard'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { movement } from '../../rules/attribute'

export class GreyHorseman extends Creature {
  id = FactionCard.GreyHorseman
  faction = Faction.GrayOrder

  value = 7
  attack = 2
  defense = 2

  attribute = movement(2)
}
