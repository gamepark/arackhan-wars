import { FactionCard } from '../../../../material/FactionCard'
import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { deactivate } from '../../rules/effect/DeactivateEffect'
import { adjacent, enemy } from '../utils/applicable-filter.utils'
import { reactivate } from '../../rules/effect/ReactivateEffect'

export class TheFear extends Spell {
  id = FactionCard.TheFear
  faction = Faction.Blight

  value = 5

  effects = [
    deactivate([adjacent, enemy]),
    reactivate([adjacent, enemy])
  ]
}
