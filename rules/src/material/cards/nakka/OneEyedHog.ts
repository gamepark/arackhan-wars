import { Faction } from '../../Faction'
import { cannotAttack } from '../Ability'
import { AttackLimitation } from '../AttackLimitation'
import { Creature } from '../Creature'

export class OneEyedHog extends Creature {
  faction = Faction.Nakka
  value = 1

  attack = 1
  defense = 1

  weakness = cannotAttack(AttackLimitation.BottomRightCards)
}
