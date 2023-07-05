import { FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class SwampTroll extends BlightCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.SwampTroll
  attack = 2
  defense = 1
  quantity = 3
}
