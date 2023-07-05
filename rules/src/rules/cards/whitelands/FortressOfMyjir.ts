import { FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class FortressOfMyjir extends WhitelandCardRule {
  kind = FactionCardKind.Land
  type = FactionCardType.FortressOfMyjir
  defense = 4
}
