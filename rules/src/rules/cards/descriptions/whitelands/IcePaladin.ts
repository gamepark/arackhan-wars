import { FactionCard } from '../../../../material/FactionCard'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'

export class IcePaladin extends Creature {
  id = FactionCard.IcePaladin
  faction = Faction.Whitelands

  value = 5
  attack = 2
  defense = 2
}
