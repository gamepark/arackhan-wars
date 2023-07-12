import { FactionCardKind } from '../FactionCardDetail'
import { WhitelandCard } from './WhitelandCard'
import { FactionCard } from '../../../../material/FactionCard'

export class WinterProtects extends WhitelandCard {
  kind = FactionCardKind.Spell
  id = FactionCard.WinterProtects
  value = 4
  quantity = 2
}
