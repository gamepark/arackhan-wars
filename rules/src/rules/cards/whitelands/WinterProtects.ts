import { FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class WinterProtects extends WhitelandCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.WinterProtects
  quantity = 2
}
