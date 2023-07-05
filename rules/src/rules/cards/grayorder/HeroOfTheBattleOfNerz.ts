import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'
import { FactionCardType } from '../../../material/FactionCardType'

export class HeroOfTheBattleOfNerz extends GrayOrderCardRule {
  kind = FactionCardKind.Creature
  type = FactionCardType.HeroOfTheBattleOfNerz
  attack = 2
  defense = 3
}
