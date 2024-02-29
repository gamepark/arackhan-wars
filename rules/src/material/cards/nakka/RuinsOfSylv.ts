import { Faction } from '../../Faction'
import { attack, range } from '../Ability'
import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { Land } from '../Land'

export class RuinsOfSylv extends Land {
  faction = Faction.Nakka
  value = 10

  defense = 4

  benefits = [
    attack(+1).to(adjacent, allied, creature),
    range(+1).to(adjacent, allied, creature)
  ]
}
