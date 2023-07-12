import { FactionCardKind } from '../FactionCardDetail'
import { BlightCard } from './BlightCard'
import { FactionCard } from '../../../../material/FactionCard'

export class ForgePatriarch extends BlightCard {
  kind = FactionCardKind.Creature
  id = FactionCard.ForgePatriarch
  value = 7
  attack = 2
  defense = 2
  quantity = 2
}
