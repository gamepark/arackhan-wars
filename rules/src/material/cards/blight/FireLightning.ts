import { Faction } from '../../Faction'
import { Spell } from '../Spell'
import { rangedAttack } from '../Attribute'

export class FireLightning extends Spell {
  faction = Faction.Blight
  value = 2

  attack = 2

  attribute = rangedAttack(3)
}
