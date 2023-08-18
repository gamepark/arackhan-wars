import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'
import { cannotBeAttacked } from '../Ability'
import { AttackLimitation } from '../AttackLimitation'

export class SwampTroll extends Creature {
  faction = Faction.Blight
  value = 4

  family = Family.Troll
  attack = 2
  defense = 1

  skill = cannotBeAttacked(AttackLimitation.ByGroupedCreatures)
}
