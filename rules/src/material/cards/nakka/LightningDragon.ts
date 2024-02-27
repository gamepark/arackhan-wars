import { Faction } from '../../Faction'
import { cannotAttack, gainAttribute } from '../Ability'
import { thereIsNot } from '../AbilityCondition'
import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { AttackLimitation } from '../AttackLimitation'
import { initiative, movement, omnistrike } from '../Attribute'
import { Creature } from '../Creature'

export class LightningDragon extends Creature {
  faction = Faction.Nakka
  value = 8
  deckBuildingValue = 13

  attack = 2
  defense = 1

  attributes = [initiative, movement(2)]
  skill = gainAttribute(omnistrike).if(thereIsNot(adjacent, allied, creature))
  weakness = cannotAttack(AttackLimitation.DuringInitiative)
}
