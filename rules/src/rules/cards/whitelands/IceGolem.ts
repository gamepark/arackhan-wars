import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'

export class IceGolem extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  attack = 3
  defense = 3
  attributes = [{ type: CardAttributeType.Perforation }]
}
