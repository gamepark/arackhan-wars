import { FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'

export class Blizzard extends WhitelandCardRule {
  kind = FactionCardKind.Spell
  astral = true
}
