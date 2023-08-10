import { allied, creature, family } from '../base/AbilityTargetFilter'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { Family } from '../base/Family'
import { defense } from '../base/Ability'

export class ShieldWall extends Spell {
  faction = Faction.GreyOrder
  value = 2

  astral = true

  effect = defense(+2).to(allied, family(Family.SixthLegion), creature).cannotAttack()
}
