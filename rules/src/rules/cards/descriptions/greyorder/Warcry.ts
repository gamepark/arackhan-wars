import { allied, creature, family } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { Family } from '../base/Family'
import { attack } from '../base/Ability'

export class Warcry extends Spell {
  faction = Faction.GreyOrder
  value = 2

  astral = true

  effect = attack(+1).to(allied, family(Family.SixthLegion), creature)
}
