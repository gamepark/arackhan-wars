import { adjacent, creature, enemy } from '../AbilityTargetFilter'
import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { loseAttribute } from '../Ability'
import { AttributeType, flight } from '../Attribute'

export class SnowGriffin extends Creature {
  faction = Faction.Whitelands
  value = 7
  deckBuildingValue = 11

  attack = 2
  defense = 1

  attribute = flight

  skill = loseAttribute(AttributeType.Swarm).to(adjacent, enemy, creature)
}
