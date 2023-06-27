import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'

export class IceMeteor extends WhitelandCardRule {
  kind = FactionCardKind.Spell
  attack = 2
  defense = 2
  attributes = [{ type: CardAttributeType.RangeAttack, strength: 3 }]
}
