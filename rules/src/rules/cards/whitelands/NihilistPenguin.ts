import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'

export class NihilistPenguin extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  attack = 0
  defense = 1
  attributes = [{
    type: CardAttributeType.Movement,
    strength: 2
  }]
  quantity = 4
}
