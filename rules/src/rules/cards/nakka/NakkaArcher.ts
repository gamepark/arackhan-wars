import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class NakkaArcher extends FactionCardRule {
  faction = Faction.Nakka
  kind = FactionCardKind.Creature
  attack = 1
  defense = 1
  attributes = [{ type: CardAttributeType.RangeAttack, strength: 2 }]
  quantity = 3
}
