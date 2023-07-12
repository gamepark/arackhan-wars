import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class MountedBanshee extends NakkaCard {
  kind = FactionCardKind.Creature
  id = FactionCard.MountedBanshee
  value = 10
  attack = 2
  defense = 2
  attributes = [{ type: CardAttributeType.Flight }]
}
