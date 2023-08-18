import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'
import { flight } from '../Attribute'

export class MountedBanshee extends Creature {
  faction = Faction.Nakka
  value = 10
  deckBuildingValue = 15

  family = Family.Sentinel
  attack = 2
  defense = 2

  attribute = flight
}
