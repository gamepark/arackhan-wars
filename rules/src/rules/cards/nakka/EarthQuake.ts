import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class EarthQuake extends FactionCardRule {
  faction = Faction.Nakka
  kind = FactionCardKind.Spell
  attack = 2
  attributes = [{ type: CardAttributeType.Omnistrike }]
}
