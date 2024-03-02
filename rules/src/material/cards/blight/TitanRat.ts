import { Faction } from '../../Faction'
import { attack } from '../Ability'
import { adjacent, allied, creature, family } from '../AbilityTargetFilter'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class TitanRat extends Creature {
  faction = Faction.Blight
  value = 7
  fullArt = true

  family = Family.Rat
  attack = 2
  defense = 2

  skills = [
    attack(+2).forEach(adjacent, allied, family(Family.ShamanRat), creature),
    attack(+1).forEach(adjacent, allied, family(Family.Rat), creature)
  ]
}
