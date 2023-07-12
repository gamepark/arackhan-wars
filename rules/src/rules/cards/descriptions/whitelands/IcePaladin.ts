import { FactionCardKind } from '../FactionCardDetail'
import { WhitelandCard } from './WhitelandCard'
import { FactionCard } from '../../../../material/FactionCard'

export class IcePaladin extends WhitelandCard {
  kind = FactionCardKind.Creature
  id = FactionCard.IcePaladin
  value = 5
  attack = 2
  defense = 2
}
