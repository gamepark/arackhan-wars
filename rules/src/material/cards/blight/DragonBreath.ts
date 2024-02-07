import { Faction } from '../../Faction'
import { perforation } from '../Attribute'
import { Spell } from '../Spell'

export class DragonBreath extends Spell {
  faction = Faction.Blight
  limit = 4
  value = 5

  attack = 4

  attribute = perforation
}
