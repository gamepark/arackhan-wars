import { Faction } from '../../Faction'
import { Spell } from '../Spell'

export class SecretIncantation extends Spell {
  faction = Faction.Whitelands
  limit = 2
  value = 7

  astral = true

  // TODO effect
}
