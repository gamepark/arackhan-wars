import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'

export class ForcedExile extends BlightCardRule {
  kind = FactionCardKind.Spell
  astral = true
  attributes = [{ type: CardAttributeType.Initiative }]
}
