import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { omnistrike } from '../base/Attribute'

export class Slayer extends Creature {
  faction = Faction.Blight
  value = 7

  attack = 2
  defense = 2

  attribute = omnistrike
}
