import { FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class ScuttleJaw extends BlightCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.ScuttleJaw
  attack = 1
}
