import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { movement } from '../Attribute'
import { Creature } from '../Creature'

export class NemesioGreyOrder extends Creature {
  faction = Faction.GreyOrder
  legendary = true
  value = 2
  deckBuildingValue = 9
  fullArt = true

  attack = 0
  defense = 1

  attribute = movement(2)
  action = RuleId.NemesioGreyOrderAction
}
