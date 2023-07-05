import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class UnstableGrowth extends NakkaCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.UnstableGrowth
}
