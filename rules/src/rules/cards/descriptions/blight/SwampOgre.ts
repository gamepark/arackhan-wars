import { FactionCard } from '../../../../material/FactionCard'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class SwampOgre extends Creature {
  id = FactionCard.SwampOgre
  faction = Faction.Blight

  value = 3
  attack = 2
  defense = 1

  quantity = 2
}
