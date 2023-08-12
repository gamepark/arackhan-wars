import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { Family } from '../base/Family'
import { movement } from '../base/Attribute'

export class NihilistPenguin extends Creature {
  faction = Faction.Whitelands
  value = 1

  family = Family.Nihilist
  attack = 0
  defense = 1

  attribute = movement(2)
}
