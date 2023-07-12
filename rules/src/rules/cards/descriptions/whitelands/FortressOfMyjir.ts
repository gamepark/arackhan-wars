import { FactionCardKind } from '../FactionCardDetail'
import { WhitelandCard } from './WhitelandCard'
import { FactionCard } from '../../../../material/FactionCard'

export class FortressOfMyjir extends WhitelandCard {
  kind = FactionCardKind.Land
  id = FactionCard.FortressOfMyjir
  value = 10
  defense = 4
}
