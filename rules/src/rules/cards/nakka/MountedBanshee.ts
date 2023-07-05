import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class MountedBanshee extends NakkaCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.MountedBanshee
  attack = 2
  defense = 2
  attributes = [{ type: CardAttributeType.Flight }]
}
