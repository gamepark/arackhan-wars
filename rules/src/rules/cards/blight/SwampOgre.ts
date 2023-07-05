import { FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class SwampOgre extends BlightCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.SwampOgre
  attack = 2
  defense = 1
  quantity = 2
}
