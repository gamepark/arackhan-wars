import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class IceMeteor extends WhitelandCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.IceMeteor
  attack = 2
  defense = 2
  attributes = [{ type: CardAttributeType.RangeAttack, strength: 3 }]
}
