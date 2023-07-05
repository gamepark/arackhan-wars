import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class SiegeTower extends GrayOrderCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.SiegeTower
  attack = 4
  defense = 1
}
