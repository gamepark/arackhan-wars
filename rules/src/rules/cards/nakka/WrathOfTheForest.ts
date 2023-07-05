import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class WrathOfTheForest extends NakkaCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.WrathOfTheForest
  attack = 3
  defense = 3
  attributes = [
    { type: CardAttributeType.Omnistrike },
    { type: CardAttributeType.Perforation }
  ]
}
