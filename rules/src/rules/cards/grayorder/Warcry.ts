import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'

export class Warcry extends GrayOrderCardRule {
  kind = FactionCardKind.Spell
  astral = true
}
