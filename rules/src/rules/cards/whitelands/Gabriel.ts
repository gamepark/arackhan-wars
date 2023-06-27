import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'

export class Gabriel extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  attack = 3
  defense = 2
  attributes = [{ type: CardAttributeType.Initiative }]
}
