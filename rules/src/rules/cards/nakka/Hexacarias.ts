import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'

export class Hexacarias extends NakkaCardRule {
  kind = FactionCardKind.Creature
  attack = 2
  defense = 2
  quantity = 2
}
