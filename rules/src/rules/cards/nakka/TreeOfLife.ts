import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class TreeOfLife extends NakkaCardRule {
  kind = FactionCardKind.Land
  type = FactionCardType.TreeOfLife
  defense = 4
}
