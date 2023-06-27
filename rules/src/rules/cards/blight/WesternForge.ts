import { FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'

export class WesternForge extends BlightCardRule {
  kind = FactionCardKind.Land
  defense = 4
}
