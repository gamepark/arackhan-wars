import { FactionCardKind } from '../FactionCardDetail'
import { GrayOrderCard } from './GrayOrderCard'
import { FactionCard } from '../../../../material/FactionCard'

export class HeroOfTheBattleOfNerz extends GrayOrderCard {
  kind = FactionCardKind.Creature
  id = FactionCard.HeroOfTheBattleOfNerz
  value = 10
  attack = 2
  defense = 3
}
