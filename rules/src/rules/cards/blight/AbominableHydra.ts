import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class AbominableHydra extends FactionCardRule {
  faction = Faction.Blight
  kind = FactionCardKind.Creature
  attack = 3
  defense = 2
  attributes = [{ type: CardAttributeType.Omnistrike }]
}
