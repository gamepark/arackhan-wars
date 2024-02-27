import { Faction } from '../../Faction'
import { attack, gainAttribute } from '../Ability'
import { thereIs } from '../AbilityCondition'
import { adjacent, allied, creature, enemy, family } from '../AbilityTargetFilter'
import { initiative } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class DeathWhisperer extends Creature {
  faction = Faction.Nakka
  value = 5

  family = Family.Musician
  attack = 1
  defense = 1

  skills = [
    attack(-1).to(adjacent, enemy, creature),
    gainAttribute(initiative).to(allied, family(Family.Musician), creature).if(thereIs(allied, family(Family.Dancer), creature))
  ]
}
