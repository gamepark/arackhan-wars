import { allied, creature, family } from '../utils/applicable-filter.utils'
import { cantAttack } from '../../rules/effect/CantAttackEffect'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { Family } from '../base/Family'
import { defense } from '../base/Ability'

export class ShieldWall extends Spell {
  faction = Faction.GreyOrder
  value = 2

  astral = true

  effects = [
    defense(+2).to(allied, family(Family.SixthLegion), creature),
    cantAttack([allied, family(Family.SixthLegion), creature])
  ]
}
