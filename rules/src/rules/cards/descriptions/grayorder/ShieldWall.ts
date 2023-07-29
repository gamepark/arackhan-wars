import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { allied, creature, family } from '../utils/applicable-filter.utils'
import { cantAttack } from '../../rules/effect/CantAttackEffect'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { Family } from '../base/Family'

export class ShieldWall extends Spell {
  faction = Faction.GrayOrder
  value = 2

  astral = true

  effects = [
    valueModifier([allied, family(Family.SixthLegion), creature], { defense: +2 }),
    cantAttack([allied, family(Family.SixthLegion), creature])
  ]
}
