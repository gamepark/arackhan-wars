import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class ChildEater extends FactionCardRule {
  faction = Faction.Blight
  kind = FactionCardKind.Creature
  attack = 4
  defense = 2
  attributes = [{ type: CardAttributeType.Perforation }]
}
