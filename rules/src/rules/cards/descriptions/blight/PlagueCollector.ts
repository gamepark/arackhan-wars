import { FactionCard } from '../../../../material/FactionCard'
import { looseAttributes } from '../../rules/effect/LooseAttributesEffect'
import { adjacent, allied, creature, enemy } from '../utils/applicable-filter.utils'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class PlagueCollector extends Creature {
  id = FactionCard.PlagueCollector
  faction = Faction.Blight

  value = 6
  attack = 1
  defense = 2

  skill = looseAttributes([adjacent, enemy, creature])
  weakness = looseAttributes([adjacent, allied, creature])
}
