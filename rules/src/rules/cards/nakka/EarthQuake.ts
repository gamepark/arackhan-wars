import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class EarthQuake extends NakkaCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.EarthQuake
  attack = 2
  attributes = [{ type: CardAttributeType.Omnistrike }]
}
