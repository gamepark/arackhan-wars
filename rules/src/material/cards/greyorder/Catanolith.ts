import { Faction } from '../../Faction'
import { cannotAttack, immuneToEnemySpells } from '../Ability'
import { isActive } from '../AbilityCondition'
import { AttackLimitation } from '../AttackLimitation'
import { rangedAttack } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class Catanolith extends Creature {
  faction = Faction.GreyOrder
  value = 10
  deckBuildingValue = 15
  holo = true

  family = Family.Artillery
  attack = 3
  defense = 1

  attribute = rangedAttack(3)
  skill = immuneToEnemySpells().if(isActive)
  weakness = cannotAttack(AttackLimitation.AdjacentCards)
}
