import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'

export class WrathOfTheForest extends NakkaCardRule {
  kind = FactionCardKind.Creature
  attack = 3
  defense = 3
  attributes = [
    { type: CardAttributeType.Omnistrike },
    { type: CardAttributeType.Perforation }
  ]
}
