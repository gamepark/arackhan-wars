import { allied, creature, family } from '../AbilityTargetFilter'
import { Faction } from '../../Faction'
import { Spell } from '../Spell'
import { Family } from '../Family'
import { attack } from '../Ability'

export class Warcry extends Spell {
  faction = Faction.GreyOrder
  value = 2

  astral = true

  effect = attack(+1).to(allied, family(Family.SixthLegion), creature)
}
