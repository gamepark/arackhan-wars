import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class PaladinOfTheGuard extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.PaladinOfTheGuard
  attack = 2
  defense = 2
  attributes = [{ type: CardAttributeType.Initiative }]
}
