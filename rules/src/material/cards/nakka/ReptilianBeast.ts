import { Faction } from '../../Faction'
import { movement, omnistrike } from '../Attribute'
import { Creature } from '../Creature'

export class ReptilianBeast extends Creature {
  faction = Faction.Nakka
  value = 8
  deckBuildingValue = 13

  attack = 2
  defense = 2

  attributes = [movement(2), omnistrike]
}
