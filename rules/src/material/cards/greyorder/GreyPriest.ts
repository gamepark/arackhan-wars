import { Faction } from '../../Faction'
import { gainAttribute, immuneToEnemySpells } from '../Ability'
import { adjacent, allied, creature, family } from '../AbilityTargetFilter'
import { initiative } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class GreyPriest extends Creature {
  faction = Faction.GreyOrder
  value = 8

  family = Family.Legion6
  attack = 1
  defense = 1

  skills = [
    immuneToEnemySpells(),
    gainAttribute(initiative).to(adjacent, allied, family(Family.Legion6), creature)
  ]
}
