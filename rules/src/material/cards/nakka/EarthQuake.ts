import { Spell } from '../Spell'
import { Faction } from '../../Faction'
import { omnistrike } from '../Attribute'

export class EarthQuake extends Spell {
  faction = Faction.Nakka
  value = 2

  attack = 2

  attribute = omnistrike
}
