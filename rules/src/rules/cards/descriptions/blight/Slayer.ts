import { FactionCard } from '../../../../material/FactionCard'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { omnistrike } from '../../rules/attribute'

export class Slayer extends Creature {
  id = FactionCard.Slayer
  faction = Faction.Blight

  value = 7
  attack = 2
  defense = 2

  attribute = omnistrike

  quantity = 2
}
