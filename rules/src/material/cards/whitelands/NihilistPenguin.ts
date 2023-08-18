import { Creature } from '../Creature'
import { Faction } from '../../Faction'
import { Family } from '../Family'
import { movement } from '../Attribute'

export class NihilistPenguin extends Creature {
  faction = Faction.Whitelands
  value = 1

  family = Family.Nihilist
  attack = 0
  defense = 1

  attribute = movement(2)
}
