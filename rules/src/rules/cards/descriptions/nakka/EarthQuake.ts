import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class EarthQuake extends NakkaCard {
  kind = FactionCardKind.Spell
  id = FactionCard.EarthQuake
  value = 2
  attack = 2
  attributes = [{ type: CardAttributeType.Omnistrike }]
}
