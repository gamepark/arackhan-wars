import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { BlightCardRule } from './BlightCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class FireLightning extends BlightCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.FireLightning
  attack = 2
  attributes = [
    { type: CardAttributeType.RangeAttack, strength: 3 }
  ]
  quantity = 2
}
