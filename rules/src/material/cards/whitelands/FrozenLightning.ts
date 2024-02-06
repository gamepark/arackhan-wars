import { Faction } from '../../Faction'
import { Spell } from '../Spell'

export class FrozenLightning extends Spell {
  faction = Faction.Whitelands
  value = 1

  attack = 2
}
