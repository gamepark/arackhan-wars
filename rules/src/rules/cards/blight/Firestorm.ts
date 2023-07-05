import { FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Firestorm extends BlightCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.Firestorm
  quantity = 2
}
