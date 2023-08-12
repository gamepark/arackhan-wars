import { adjacent, creature, enemy } from '../base/AbilityTargetFilter'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { loseAttribute } from '../base/Ability'
import { AttributeType, flight } from '../base/Attribute'

export class SnowGriffin extends Creature {
  faction = Faction.Whitelands
  value = 7
  deckBuildingValue = 11

  attack = 2
  defense = 1

  attribute = flight

  skill = loseAttribute(AttributeType.Swarm).to(adjacent, enemy, creature)
}
