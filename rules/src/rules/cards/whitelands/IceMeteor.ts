import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class IceMeteor extends FactionCardRule {
  faction = Faction.Whitelands
  kind = FactionCardKind.Spell
  attack = 2
  defense = 2
  attributes = [{ type: CardAttributeType.RangeAttack, strength: 3 }]
}
