import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { initiative, omnistrike } from '../../rules/attribute'

export class Berserker extends Creature {
  faction = Faction.Blight
  value = 4

  attack = 1
  defense = 1

  attributes = [
    initiative,
    omnistrike
  ]
}
