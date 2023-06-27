import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'

export class PaladinOfTheGuard extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  attack = 2
  defense = 2
  attributes = [{ type: CardAttributeType.Initiative }]
}
