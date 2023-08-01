import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { flight } from '../../rules/attribute'
import { Family } from '../base/Family'

export class MountedBanshee extends Creature {
  faction = Faction.Nakka
  value = 10
  deckBuildingValue = 15

  family = Family.Sentinel
  attack = 2
  defense = 2

  attribute = flight
}
