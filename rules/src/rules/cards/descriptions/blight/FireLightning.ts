import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { rangedAttack } from '../base/Attribute'

export class FireLightning extends Spell {
  faction = Faction.Blight
  value = 2

  attack = 2

  attribute = rangedAttack(3)
}
