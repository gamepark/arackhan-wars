import { adjacent, allied, creature } from '../base/AbilityTargetFilter'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { canOnlyBeAttacked, defense } from '../base/Ability'
import { AttackCondition } from '../base/AttackLimitation'

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
