import { CardAttributeType, FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class WrathOfTheForest extends FactionCardRule {
  faction = Faction.Nakka
  kind = FactionCardKind.Creature
  attack = 3
  defense = 3
  attributes = [
    { type: CardAttributeType.Omnistrike },
    { type: CardAttributeType.Perforation }
  ]
}
