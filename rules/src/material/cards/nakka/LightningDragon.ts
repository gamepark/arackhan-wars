import { Faction } from '../../Faction'
import { gainAttribute } from '../Ability'
import { initiative, movement, omnistrike } from '../Attribute'
import { Creature } from '../Creature'
import { GainAttributesCondition } from '../Effect'

export class LightningDragon extends Creature {
  faction = Faction.Nakka
  value = 8
  deckBuildingValue = 13

  attack = 2
  defense = 1

  attributes = [initiative, movement(2)]
  skill = gainAttribute(omnistrike, [GainAttributesCondition.Isolated])
  // TODO weakness
}
