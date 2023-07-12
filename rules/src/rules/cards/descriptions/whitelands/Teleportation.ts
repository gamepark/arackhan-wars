import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { WhitelandCard } from './WhitelandCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Teleportation extends WhitelandCard {
  kind = FactionCardKind.Spell
  id = FactionCard.Teleportation
  value = 4
  astral = true
  attributes = [{ type: CardAttributeType.Initiative }]
}
