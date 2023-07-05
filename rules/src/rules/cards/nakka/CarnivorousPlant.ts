import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class CarnivorousPlant extends NakkaCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.CarnivorousPlant
  attack = 1
  defense = 1
  quantity = 2
}
