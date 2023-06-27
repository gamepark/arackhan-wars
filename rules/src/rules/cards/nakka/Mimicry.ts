import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'

export class Mimicry extends NakkaCardRule {
  kind = FactionCardKind.Spell
  astral = true
}
