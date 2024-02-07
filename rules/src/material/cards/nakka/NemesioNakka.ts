import { Faction } from '../../Faction'
import { canOnlyBeAttacked } from '../Ability'
import { AttackCondition } from '../AttackLimitation'
import { movement } from '../Attribute'
import { Creature } from '../Creature'

export class NemesioNakka extends Creature {
  faction = Faction.Nakka
  legendary = true
  value = 4
  deckBuildingValue = 9

  attack = 1
  defense = 1

  attribute = movement(2)
  skill = canOnlyBeAttacked(AttackCondition.ByCreaturesInGroup)
  // TODO action
}
