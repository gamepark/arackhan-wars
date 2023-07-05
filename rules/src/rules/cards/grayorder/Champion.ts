import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Champion extends GrayOrderCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.Champion
  attack = 2
  defense = 2
  quantity = 2
}
