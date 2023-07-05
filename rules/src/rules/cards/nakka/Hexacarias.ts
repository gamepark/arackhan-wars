import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Hexacarias extends NakkaCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.Hexacarias
  attack = 2
  defense = 2
  quantity = 2
}
