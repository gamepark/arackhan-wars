import { FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'

export class FortressOfMyjir extends WhitelandCardRule {
  kind = FactionCardKind.Land
  defense = 4
}
