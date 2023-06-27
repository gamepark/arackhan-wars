import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class Teleportation extends FactionCardRule {
  faction = Faction.Whitelands
  kind = FactionCardKind.Spell
  astral = true
  attributes = [{ type: CardAttributeType.Initiative }]
}
