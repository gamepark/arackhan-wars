import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { deactivate } from '../../rules/effect/DeactivateEffect'
import { adjacent, enemy } from '../utils/applicable-filter.utils'
import { reactivate } from '../../rules/effect/ReactivateEffect'

export class TheFear extends Spell {
  faction = Faction.Blight
  legendary = true
  value = 5

  effects = [
    deactivate([adjacent, enemy]),
    reactivate([adjacent, enemy])
  ]
}
