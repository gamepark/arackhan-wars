import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { flight, stealth } from '../Attribute'
import { Creature } from '../Creature'

export class TomurDisc extends Creature {
  faction = Faction.GreyOrder
  legendary = true
  value = 1
  deckBuildingValue = 15

  attack = 1
  defense = 0

  attributes = [stealth, flight]
  action = RuleId.TomurDiscAction
}
