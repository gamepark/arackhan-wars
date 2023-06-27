import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class Eagle extends FactionCardRule {
  faction = Faction.Whitelands
  kind = FactionCardKind.Creature
  attack = 1
  defense = 1
  quantity = 2
  attributes = [{ type: CardAttributeType.Flight }]
}
