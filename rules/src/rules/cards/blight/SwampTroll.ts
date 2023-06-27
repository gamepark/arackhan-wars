import { FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'

export class SwampTroll extends BlightCardRule {
  kind = FactionCardKind.Creature
  attack = 2
  defense = 1
  quantity = 3
}
