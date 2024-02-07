import { Faction } from '../../Faction'
import { movement, regeneration } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class Walker extends Creature {
  faction = Faction.Nakka
  value = 8
  deckBuildingValue = 11
  limit = 4

  family = Family.Yhdorian
  attack = 2
  defense = 1

  attributes = [regeneration, movement(2)]
}
