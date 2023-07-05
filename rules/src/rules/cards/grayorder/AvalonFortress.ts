import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class AvalonFortress extends GrayOrderCardRule {
  kind = FactionCardKind.Land
  type = FactionCardType.AvalonFortress
  defense = 4
}
