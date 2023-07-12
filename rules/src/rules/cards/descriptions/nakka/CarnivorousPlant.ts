import { FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class CarnivorousPlant extends NakkaCard {
  kind = FactionCardKind.Creature
  id = FactionCard.CarnivorousPlant
  value = 6
  attack = 1
  defense = 1
  quantity = 2
}
