import { CardAttributeType, FactionCardKind } from '../FactionCardDetail'
import { WhitelandCard } from './WhitelandCard'
import { FactionCard } from '../../../../material/FactionCard'

export class IceMeteor extends WhitelandCard {
  kind = FactionCardKind.Spell
  id = FactionCard.IceMeteor
  value = 1
  attack = 2
  defense = 2
  attributes = [{ type: CardAttributeType.RangeAttack, strength: 3 }]
}
