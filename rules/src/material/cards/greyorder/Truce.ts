import { Faction } from '../../Faction'
import { cannotAttack, cannotBeAttacked } from '../Ability'
import { adjacent, creature } from '../AbilityTargetFilter'
import { Spell } from '../Spell'

export class Truce extends Spell {
  faction = Faction.GreyOrder
  value = 4
  limit = 2

  effects = [
    cannotAttack().to(adjacent, creature),
    cannotBeAttacked().to(adjacent, creature)
  ]
}
