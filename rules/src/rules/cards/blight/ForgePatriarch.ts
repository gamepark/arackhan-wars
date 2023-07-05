import { FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class ForgePatriarch extends BlightCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.ForgePatriarch
  attack = 2
  defense = 2
  quantity = 2
}
