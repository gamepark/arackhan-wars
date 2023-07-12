import { FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Behemoth extends NakkaCard {
  kind = FactionCardKind.Creature
  id = FactionCard.Behemoth
  value = 8
  attack = 3
  defense = 2
}
