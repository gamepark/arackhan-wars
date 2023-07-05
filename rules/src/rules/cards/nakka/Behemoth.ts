import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class Behemoth extends NakkaCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.Behemoth
  attack = 3
  defense = 2
}
