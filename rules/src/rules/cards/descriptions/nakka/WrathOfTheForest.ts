import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class WrathOfTheForest extends NakkaCard {
  kind = FactionCardKind.Creature
  id = FactionCard.WrathOfTheForest
  value = 13
  attack = 3
  defense = 3
  attributes = [
    { type: CardAttributeType.Omnistrike },
    { type: CardAttributeType.Perforation }
  ]
}
