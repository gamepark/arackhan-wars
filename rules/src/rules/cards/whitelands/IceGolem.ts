import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class IceGolem extends FactionCardRule {
  faction = Faction.Whitelands
  kind = FactionCardKind.Creature
  attack = 3
  defense = 3
  attributes = [{ type: CardAttributeType.Perforation }]
}
