import { Creature } from '../Creature'
import { Faction } from '../../Faction'
import { Family } from '../Family'
import { movement } from '../Attribute'

export class NihilistMorgon extends Creature {
  faction = Faction.Whitelands
  value = 6

  family = Family.Nihilist
  attack = 1
  defense = 2

  attribute = movement(2)
  // TODO skill
}
