import { FactionCardKind } from '../FactionCardDetail'
import { WhitelandCard } from './WhitelandCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Blizzard extends WhitelandCard {
  kind = FactionCardKind.Spell
  id = FactionCard.Blizzard
  value = 6
  astral = true
}
