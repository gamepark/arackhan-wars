import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class Slayer extends FactionCardRule {
  faction = Faction.Blight
  kind = FactionCardKind.Creature
  attack = 2
  defense = 2
  quantity = 2
  attributes = [{ type: CardAttributeType.Omnistrike }]
}
