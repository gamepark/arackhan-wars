import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { Family } from '../base/Family'
import { initiative } from '../base/Attribute'

export class Gabriel extends Creature {
  faction = Faction.Whitelands
  legendary = true
  value = 10
  deckBuildingValue = 13

  family = Family.IceGuard
  attack = 3
  defense = 2

  attribute = initiative
}
