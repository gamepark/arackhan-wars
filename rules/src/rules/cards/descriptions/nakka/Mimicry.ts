import { FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class Mimicry extends NakkaCard {
  kind = FactionCardKind.Spell
  id = FactionCard.Mimicry
  value = 3
  astral = true
}
