import { FactionCard } from '../../../../material/FactionCard'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'

export class LunarWendigo extends Creature {
  id = FactionCard.LunarWendigo
  faction = Faction.Whitelands

  value = 3
  attack = 1
  defense = 2

  quantity = 2
}
