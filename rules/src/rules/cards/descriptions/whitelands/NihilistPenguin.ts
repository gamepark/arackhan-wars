import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { movement } from '../../rules/attribute'

export class NihilistPenguin extends Creature {
  faction = Faction.Whitelands
  value = 1

  attack = 0
  defense = 1

  attribute = movement(2)
}
