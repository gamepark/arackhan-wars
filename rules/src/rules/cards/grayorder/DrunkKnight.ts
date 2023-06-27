import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'

export class DrunkKnight extends GrayOrderCardRule {
  kind = FactionCardKind.Creature
  attack = 1
  defense = 1
  quantity = 4
}
