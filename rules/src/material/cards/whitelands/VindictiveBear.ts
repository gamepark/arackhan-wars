import { Faction } from '../../Faction'
import { attack } from '../Ability'
import { adjacent, enemy } from '../AbilityTargetFilter'
import { omnistrike } from '../Attribute'
import { Creature } from '../Creature'

export class VindictiveBear extends Creature {
  faction = Faction.Whitelands
  value = 12
  deckBuildingValue = 14

  attack = 1
  defense = 3

  attribute = omnistrike
  skill = attack(+1).per(adjacent, enemy)
}
