import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { Family } from '../base/Family'
import { canOnlyBeAttackedBy } from '../base/Ability'
import { AttackLimitation } from '../base/AttackLimitation'

export class SwampTroll extends Creature {
  faction = Faction.Blight
  value = 4

  family = Family.Troll
  attack = 2
  defense = 1

  skill = canOnlyBeAttackedBy(AttackLimitation.NoGroupedCreatures)
}
