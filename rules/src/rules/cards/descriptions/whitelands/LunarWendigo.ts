import { FactionCardKind } from '../FactionCardDetail'
import { WhitelandCard } from './WhitelandCard'
import { FactionCard } from '../../../../material/FactionCard'

export class LunarWendigo extends WhitelandCard {
  kind = FactionCardKind.Creature
  id = FactionCard.LunarWendigo
  value = 3
  attack = 1
  defense = 2
  quantity = 2
}
