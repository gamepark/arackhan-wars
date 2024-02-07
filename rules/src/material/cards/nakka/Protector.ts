import { Faction } from '../../Faction'
import { movement } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class Protector extends Creature {
  faction = Faction.Nakka
  value = 7
  deckBuildingValue = 10

  family = Family.Yhdorian
  attack = 0
  defense = 2

  attribute = movement(2)
  // TODO skill & action
}
