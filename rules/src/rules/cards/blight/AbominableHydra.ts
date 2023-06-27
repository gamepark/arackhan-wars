import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'

export class AbominableHydra extends BlightCardRule {
  kind = FactionCardKind.Creature
  attack = 3
  defense = 2
  attributes = [{ type: CardAttributeType.Omnistrike }]
}
