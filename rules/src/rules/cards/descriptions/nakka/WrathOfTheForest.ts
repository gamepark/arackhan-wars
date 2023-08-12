import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { omnistrike, perforation } from '../base/Attribute'

export class WrathOfTheForest extends Creature {
  faction = Faction.Nakka
  value = 13
  deckBuildingValue = 16

  attack = 3
  defense = 3

  attributes = [omnistrike, perforation]
}
