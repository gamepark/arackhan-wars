import { FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'

export class WinterProtects extends WhitelandCardRule {
  kind = FactionCardKind.Spell
  quantity = 2
}
