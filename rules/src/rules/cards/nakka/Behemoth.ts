import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'

export class Behemoth extends NakkaCardRule {
  kind = FactionCardKind.Creature
  attack = 3
  defense = 2
}
