import { Faction } from '../../Faction'
import { omnistrike } from '../Attribute'
import { Spell } from '../Spell'

export class YhdilBlast extends Spell {
  faction = Faction.GreyOrder
  value = 4

  attack = 3

  attribute = omnistrike
}
