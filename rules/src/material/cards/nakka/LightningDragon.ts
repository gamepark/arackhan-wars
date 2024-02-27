import { Faction } from '../../Faction'
import { cannotAttack, gainAttribute } from '../Ability'
import { AttackLimitation } from '../AttackLimitation'
import { initiative, movement, omnistrike } from '../Attribute'
import { Creature } from '../Creature'
import { GainAttributesCondition } from '../Effect'

export class LightningDragon extends Creature {
  faction = Faction.Nakka
  value = 8
  deckBuildingValue = 13

  attack = 2
  defense = 1

  attributes = [initiative, movement(2)]
  skill = gainAttribute(omnistrike, [GainAttributesCondition.Isolated])
  weakness = cannotAttack(AttackLimitation.DuringInitiative)
}
