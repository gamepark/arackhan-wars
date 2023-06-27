import { FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'

export class LunarWendigo extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  attack = 1
  defense = 2
  quantity = 2
}
