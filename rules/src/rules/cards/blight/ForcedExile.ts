import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class ForcedExile extends FactionCardRule {
  faction = Faction.Blight
  kind = FactionCardKind.Spell
  astral = true
  attributes = [{ type: CardAttributeType.Initiative }]
}
