import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Warcry extends GrayOrderCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.Warcry
  astral = true
}
