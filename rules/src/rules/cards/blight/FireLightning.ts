import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'

export class FireLightning extends BlightCardRule {
  kind = FactionCardKind.Spell
  attack = 2
  attributes = [
    { type: CardAttributeType.RangeAttack, strength: 3 }
  ]
  quantity = 2
}
