import { CardAttributeType } from '../base/FactionCardDetail'
import { FactionCard } from '../../../../material/FactionCard'
import { gainAttributes } from '../../rules/effect/GainAttributesEffect'
import { adjacent, allied, creature } from '../utils/applicable-filter.utils'
import { Land } from '../base/Land'
import { Faction } from '../../../../Faction'

export class TreeOfLife extends Land {
  id = FactionCard.TreeOfLife
  faction = Faction.Nakka
  legendary = true
  value = 12

  defense = 4

  benefit = gainAttributes([adjacent, allied, creature], [CardAttributeType.Regeneration])
}
