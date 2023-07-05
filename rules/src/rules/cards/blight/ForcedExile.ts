import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class ForcedExile extends BlightCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.ForcedExile
  astral = true
  attributes = [{ type: CardAttributeType.Initiative }]
}
