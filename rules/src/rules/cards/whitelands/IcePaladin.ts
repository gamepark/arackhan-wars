import { FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class IcePaladin extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.IcePaladin
  attack = 2
  defense = 2
}
