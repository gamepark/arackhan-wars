import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class NihilistPenguin extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.NihilistPenguin
  attack = 0
  defense = 1
  attributes = [{
    type: CardAttributeType.Movement,
    strength: 2
  }]
  quantity = 4
}
