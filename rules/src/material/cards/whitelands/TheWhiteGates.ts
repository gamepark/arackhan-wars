import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { Land } from '../Land'
import { Faction } from '../../Faction'
import { defense } from '../Ability'

export class TheWhiteGates extends Land {
  faction = Faction.Whitelands
  value = 10
  fullArt = true

  defense = 4

  benefit = defense(+1).to(adjacent, allied, creature)
  // TODO action
}
