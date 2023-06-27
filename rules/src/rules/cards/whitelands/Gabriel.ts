import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class Gabriel extends FactionCardRule {
  faction = Faction.Whitelands
  kind = FactionCardKind.Creature
  attack = 3
  defense = 2
  attributes = [{ type: CardAttributeType.Initiative }]
}
