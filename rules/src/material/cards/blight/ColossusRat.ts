import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class ColossusRat extends Creature {
  faction = Faction.Blight
  value = 6

  family = Family.Rat
  attack = 3
  defense = 2

  // TODO weakness
}
