import { Faction } from '../../Faction'
import { initiative, movement } from '../Attribute'
import { Creature } from '../Creature'

export class LightningDragon extends Creature {
  faction = Faction.Nakka
  value = 8
  deckBuildingValue = 13

  attack = 2
  defense = 1

  attributes = [initiative, movement(2)]
  // TODO skill & weakness
}
