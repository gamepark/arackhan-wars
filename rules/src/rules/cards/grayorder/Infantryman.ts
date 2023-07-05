import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Infantryman extends GrayOrderCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.Infantryman
  attack = 1
  defense = 1
  quantity = 3
}
