import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class SnowGriffin extends FactionCardRule {
  faction = Faction.Whitelands
  kind = FactionCardKind.Creature
  attack = 2
  defense = 1
  attributes = [{ type: CardAttributeType.Flight }]
  quantity = 2
}
