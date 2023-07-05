import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class SenileYhdorian extends NakkaCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.SenileYhdorian
  attack = 1
  defense = 3
  quantity = 2
}
