import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class SeniorMercenary extends Creature {
  faction = Faction.GreyOrder
  value = 4

  family = Family.Mercenary
  attack = 2
  defense = 1

  // TODO skill
}
