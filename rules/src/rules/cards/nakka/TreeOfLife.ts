import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'

export class TreeOfLife extends NakkaCardRule {
  kind = FactionCardKind.Land
  defense = 4
}
