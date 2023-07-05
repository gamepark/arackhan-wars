import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Mimicry extends NakkaCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.Mimicry
  astral = true
}
