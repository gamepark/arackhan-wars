import { Faction } from '../../Faction'
import { omnistrike } from '../Attribute'
import { Creature } from '../Creature'

export class Flail extends Creature {
  faction = Faction.Blight
  value = 2

  attack = 2
  defense = 0

  attribute = omnistrike
  // TODO weakness
}
