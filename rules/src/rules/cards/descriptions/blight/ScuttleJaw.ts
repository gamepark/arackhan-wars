import { FactionCard } from '../../../../material/FactionCard'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class ScuttleJaw extends Creature {
  id = FactionCard.ScuttleJaw
  faction = Faction.Blight
  
  value = 1
  attack = 1
  defense = 0
}
