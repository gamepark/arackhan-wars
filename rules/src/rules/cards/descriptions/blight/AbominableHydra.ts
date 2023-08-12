import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { omnistrike } from '../base/Attribute'

export class AbominableHydra extends Creature {
  faction = Faction.Blight
  value = 12

  attack = 3
  defense = 2

  attribute = omnistrike
}
