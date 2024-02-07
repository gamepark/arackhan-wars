import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class TitanRat extends Creature {
  faction = Faction.Blight
  value = 7
  fullArt = true

  family = Family.Rat
  attack = 2
  defense = 2

  // TODO skills
}
