import { Faction } from '../../Faction'
import { flight, swarm } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class WingedTerror extends Creature {
  faction = Faction.Blight
  limit = 7
  value = 8
  deckBuildingValue = 10

  family = Family.Harpy
  attack = 1
  defense = 1

  attributes = [swarm, flight]
}
