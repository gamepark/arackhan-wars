import { Faction } from '../../Faction'
import { Creature } from '../Creature'

export class FrostMaiden extends Creature {
  faction = Faction.Whitelands
  value = 3

  attack = 1
  defense = 1

  // TODO skill
}
