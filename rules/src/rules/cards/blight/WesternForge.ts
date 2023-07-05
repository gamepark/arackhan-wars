import { FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class WesternForge extends BlightCardRule {
  kind = FactionCardKind.Land
  type = FactionCardType.WesternForge
  defense = 4
}
