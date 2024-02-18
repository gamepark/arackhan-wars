import { RuleId } from '../../../rules/RuleId'
import { Faction } from '../../Faction'
import { flight, stealth } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class NoviceFairy extends Creature {
  faction = Faction.Whitelands
  value = 5

  family = Family.IceFairy
  attack = 0
  defense = 0

  attributes = [stealth, flight]
  action = RuleId.NoviceFairyAction
}
