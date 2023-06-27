import { FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'

export class Firestorm extends BlightCardRule {
  kind = FactionCardKind.Spell
  quantity = 2
}
