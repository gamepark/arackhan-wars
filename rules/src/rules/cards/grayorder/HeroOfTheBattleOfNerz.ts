import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'

export class HeroOfTheBattleOfNerz extends GrayOrderCardRule {
  kind = FactionCardKind.Creature
  attack = 2
  defense = 3
}
