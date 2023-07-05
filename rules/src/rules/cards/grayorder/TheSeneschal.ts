import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class TheSeneschal extends GrayOrderCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.TheSeneschal
  attack = 4
  defense = 2
}
