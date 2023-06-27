import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'

export class ShieldWall extends GrayOrderCardRule {
  kind = FactionCardKind.Spell
  astral = true
}
