import { FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'

export class PlagueCollector extends BlightCardRule {
  kind = FactionCardKind.Creature
  attack = 1
  defense = 2
  quantity = 2
}
