import { FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class PlagueCollector extends BlightCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.PlagueCollector
  attack = 1
  defense = 2
  quantity = 2
}
