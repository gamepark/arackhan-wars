import { FactionCard } from '../../../../material/FactionCard'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'

export class Behemoth extends Creature {
  id = FactionCard.Behemoth
  faction = Faction.Nakka

  value = 8
  attack = 3
  defense = 2
}
