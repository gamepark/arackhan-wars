import { FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'

export class ForgePatriarch extends BlightCardRule {
  kind = FactionCardKind.Creature
  attack = 2
  defense = 2
  quantity = 2
}
