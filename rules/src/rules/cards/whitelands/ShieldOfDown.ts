import { FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class ShieldOfDown extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.ShieldOfDawn
  attack = 1
  defense = 2
  quantity = 3
}
