import { FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class TheFear extends BlightCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.TheFear
}
