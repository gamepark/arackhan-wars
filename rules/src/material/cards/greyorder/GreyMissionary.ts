import { Faction } from '../../Faction'
import { immuneToEnemySpells } from '../Ability'
import { adjacent, allied, creature, family } from '../AbilityTargetFilter'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class GreyMissionary extends Creature {
  faction = Faction.GreyOrder
  value = 8

  family = Family.Legion6
  attack = 2
  defense = 2

  skills = [
    immuneToEnemySpells(),
    immuneToEnemySpells().to(adjacent, allied, family(Family.Legion6), creature)
  ]
}
