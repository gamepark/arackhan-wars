import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class WhitePlainsMercenary extends Creature {
  faction = Faction.GreyOrder
  value = 4

  family = Family.Mercenary
  attack = 2
  defense = 3

  // TODO weakness
}
