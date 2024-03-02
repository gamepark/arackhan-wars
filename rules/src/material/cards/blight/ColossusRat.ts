import { Faction } from '../../Faction'
import { cannotAttack } from '../Ability'
import { AttackLimitation } from '../AttackLimitation'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class ColossusRat extends Creature {
  faction = Faction.Blight
  value = 6

  family = Family.Rat
  attack = 3
  defense = 2

  weakness = cannotAttack(AttackLimitation.InGroupNotFamily)
}
