import { Faction } from '../../Faction'
import { loseAttributes } from '../Ability'
import { adjacent, allied, creature, enemy } from '../AbilityTargetFilter'
import { movement } from '../Attribute'
import { Creature } from '../Creature'

export class PlagueWagon extends Creature {
  faction = Faction.Blight
  value = 10
  deckBuildingValue = 14
  holo = true

  attack = 2
  defense = 2

  attribute = movement(2)
  skill = loseAttributes().to(adjacent, enemy, creature)
  weakness = loseAttributes().to(adjacent, allied, creature)
}
