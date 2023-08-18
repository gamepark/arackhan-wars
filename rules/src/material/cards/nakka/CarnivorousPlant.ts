import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { canOnlyBeAttacked, defense } from '../Ability'
import { AttackCondition } from '../AttackLimitation'

export class CarnivorousPlant extends Creature {
  faction = Faction.Nakka
  value = 6

  attack = 1
  defense = 1

  skills = [
    defense(+1).to(adjacent, allied, creature),
    canOnlyBeAttacked(AttackCondition.ByCreaturesInGroup)
  ]
}
