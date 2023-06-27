import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class Ballista extends FactionCardRule {
  faction = Faction.GrayOrder
  kind = FactionCardKind.Creature
  attack = 1
  defense = 1
  attributes = [{ type: CardAttributeType.RangeAttack, strength: 3 }]
  quantity = 2
}
