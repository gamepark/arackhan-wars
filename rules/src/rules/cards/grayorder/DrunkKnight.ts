import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class DrunkKnight extends GrayOrderCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.DrunkKnight
  attack = 1
  defense = 1
  quantity = 4
}
