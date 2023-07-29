import { FactionCard } from '../../../../material/FactionCard'
import { valueModifier } from '../../rules/effect/ValueModifierEffect'
import { allied, creature, family } from '../utils/applicable-filter.utils'
import { cantAttack } from '../../rules/effect/CantAttackEffect'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'

export class ShieldWall extends Spell {
  id = FactionCard.ShieldWall
  faction = Faction.GrayOrder
  family = '6th-legion'

  value = 2
  astral = true

  effects = [
    valueModifier([allied, family(this.family), creature], { defense: +2 }),
    cantAttack([allied, family(this.family), creature])
  ]
}
