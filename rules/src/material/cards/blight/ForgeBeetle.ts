import { Faction } from '../../Faction'
import { attack } from '../Ability'
import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { flight } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class ForgeBeetle extends Creature {
  faction = Faction.Blight
  limit = 2
  value = 6

  family = Family.Blacksmith
  attack = 0
  defense = 0

  attribute = flight
  skill = attack(+1).to(adjacent, allied, creature)
}
