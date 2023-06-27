import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'

export class SiegeTower extends GrayOrderCardRule {
  kind = FactionCardKind.Creature
  attack = 4
  defense = 1
}
