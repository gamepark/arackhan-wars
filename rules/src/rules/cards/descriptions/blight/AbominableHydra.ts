import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { BlightCard } from './BlightCard'
import { FactionCard } from '../../../../material/FactionCard'

export class AbominableHydra extends BlightCard {
  kind = FactionCardKind.Creature
  id = FactionCard.AbominableHydra
  value = 12
  attack = 3
  defense = 2
  attributes = [{ type: CardAttributeType.Omnistrike }]
}
