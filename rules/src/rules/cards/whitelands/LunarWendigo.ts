import { FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class LunarWendigo extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.LunarWendigo
  attack = 1
  defense = 2
  quantity = 2
}
