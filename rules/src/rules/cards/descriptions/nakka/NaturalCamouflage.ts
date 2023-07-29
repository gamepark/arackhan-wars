import { FactionCard } from '../../../../material/FactionCard'
import { cantBeAttacked } from '../../rules/effect/CantBeAttackedEffect'
import { adjacent, allied, creature, land, or } from '../utils/applicable-filter.utils'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'

export class NaturalCamouflage extends Spell {
  id = FactionCard.NaturalCamouflage
  faction = Faction.Nakka
  limit = 2
  value = 3

  effect = cantBeAttacked([adjacent, allied, or(creature, land)])
}
