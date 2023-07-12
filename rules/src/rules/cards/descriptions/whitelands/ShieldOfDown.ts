import { FactionCardKind } from '../FactionCardDetail'
import { WhitelandCard } from './WhitelandCard'
import { FactionCard } from '../../../../material/FactionCard'

export class ShieldOfDown extends WhitelandCard {
  kind = FactionCardKind.Creature
  id = FactionCard.ShieldOfDawn
  value = 5
  attack = 1
  defense = 2
  quantity = 3
}
