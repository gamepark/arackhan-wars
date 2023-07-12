import { FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Hexacarias extends NakkaCard {
  kind = FactionCardKind.Creature
  id = FactionCard.Hexacarias
  value = 5
  attack = 2
  defense = 2
  quantity = 2
}
