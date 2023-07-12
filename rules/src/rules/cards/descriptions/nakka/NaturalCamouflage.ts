import { FactionCardKind } from '../FactionCardDetail'
import { NakkaCard } from './NakkaCard'
import { FactionCard } from '../../../../material/FactionCard'

export class NaturalCamouflage extends NakkaCard {
  kind = FactionCardKind.Spell
  id = FactionCard.NaturalCamouflage
  value = 3
}
