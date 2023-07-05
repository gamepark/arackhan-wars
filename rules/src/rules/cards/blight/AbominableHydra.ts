import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class AbominableHydra extends BlightCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.AbominableHydra
  attack = 3
  defense = 2
  attributes = [{ type: CardAttributeType.Omnistrike }]
}
