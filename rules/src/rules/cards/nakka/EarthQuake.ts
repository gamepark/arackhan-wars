import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'

export class EarthQuake extends NakkaCardRule {
  kind = FactionCardKind.Spell
  attack = 2
  attributes = [{ type: CardAttributeType.Omnistrike }]
}
