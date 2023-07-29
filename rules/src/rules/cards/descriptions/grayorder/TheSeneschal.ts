import { FactionCard } from '../../../../material/FactionCard'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { omnistrike } from '../../rules/attribute'

export class TheSeneschal extends Creature {
  id = FactionCard.TheSeneschal
  faction = Faction.GrayOrder
  legendary = true
  value = 14

  attack = 4
  defense = 2

  attribute = omnistrike
}
