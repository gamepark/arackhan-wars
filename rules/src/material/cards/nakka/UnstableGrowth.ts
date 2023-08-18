import { adjacent, allied, creature } from '../AbilityTargetFilter'
import { Spell } from '../Spell'
import { Faction } from '../../Faction'
import { attack } from '../Ability'

export class UnstableGrowth extends Spell {
  faction = Faction.Nakka

  value = 2

  effect = attack(+2).defense(-1).to(adjacent, allied, creature)
}
