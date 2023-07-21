import { FactionCard } from '../../../../material/FactionCard'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { perforation } from '../../rules/attribute'

export class IceGolem extends Creature {
  id = FactionCard.IceGolem
  faction = Faction.Whitelands

  value = 13
  attack = 3
  defense = 3

  attribute = perforation
}
