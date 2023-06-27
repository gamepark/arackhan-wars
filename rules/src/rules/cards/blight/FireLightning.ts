import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class FireLightning extends FactionCardRule {
  faction = Faction.Blight
  kind = FactionCardKind.Spell
  attack = 2
  attributes = [
    { type: CardAttributeType.RangeAttack, strength: 3 }
  ]
  quantity = 2
}
