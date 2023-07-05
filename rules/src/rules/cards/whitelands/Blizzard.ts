import { FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Blizzard extends WhitelandCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.Blizzard
  astral = true
}
