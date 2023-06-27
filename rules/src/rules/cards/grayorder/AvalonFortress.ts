import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'

export class AvalonFortress extends GrayOrderCardRule {
  kind = FactionCardKind.Land
  defense = 4
}
