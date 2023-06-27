import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'

export class CarnivorousPlant extends NakkaCardRule {
  kind = FactionCardKind.Creature
  attack = 1
  defense = 1
  quantity = 2
}
