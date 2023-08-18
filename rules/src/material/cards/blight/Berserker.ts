import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { initiative, omnistrike } from '../Attribute'

export class Berserker extends Creature {
  faction = Faction.Blight
  value = 4

  attack = 1
  defense = 1

  attributes = [initiative, omnistrike]
}
