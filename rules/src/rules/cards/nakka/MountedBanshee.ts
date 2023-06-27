import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'

export class MountedBanshee extends NakkaCardRule {
  kind = FactionCardKind.Creature
  attack = 2
  defense = 2
  attributes = [{ type: CardAttributeType.Flight }]
}
