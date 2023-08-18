import { allied, creature, family } from '../AbilityTargetFilter'
import { Spell } from '../Spell'
import { Faction } from '../../Faction'
import { Family } from '../Family'
import { defense } from '../Ability'

export class ShieldWall extends Spell {
  faction = Faction.GreyOrder
  value = 2

  astral = true

  effect = defense(+2).to(allied, family(Family.SixthLegion), creature).cannotAttack()
}
