import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'

export class SenileYhdorian extends NakkaCardRule {
  kind = FactionCardKind.Creature
  attack = 1
  defense = 3
  quantity = 2
}
