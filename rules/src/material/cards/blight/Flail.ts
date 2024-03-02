import { Faction } from '../../Faction'
import { hitAllies } from '../Ability'
import { omnistrike } from '../Attribute'
import { Creature } from '../Creature'

export class Flail extends Creature {
  faction = Faction.Blight
  value = 2

  attack = 2
  defense = 0

  attribute = omnistrike
  weakness = hitAllies()
}
