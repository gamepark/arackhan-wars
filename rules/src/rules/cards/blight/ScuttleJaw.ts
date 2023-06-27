import { FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'

export class ScuttleJaw extends BlightCardRule {
  kind = FactionCardKind.Creature
  attack = 1
}
