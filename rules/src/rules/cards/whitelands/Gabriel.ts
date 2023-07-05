import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Gabriel extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.Gabriel
  attack = 3
  defense = 2
  attributes = [{ type: CardAttributeType.Initiative }]
}
