import { FactionCardKind } from '../FactionCardRule'
import { NakkaCardRule } from './NakkaCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class NaturalCamouflage extends NakkaCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.NaturalCamouflage
}
