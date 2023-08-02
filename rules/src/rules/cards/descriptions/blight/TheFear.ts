import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { deactivate } from '../../rules/effect/DeactivateEffect'
import { adjacent, enemy } from '../utils/applicable-filter.utils'

export class TheFear extends Spell {
  faction = Faction.Blight
  legendary = true
  value = 5

  effect = deactivate([adjacent, enemy])
}
