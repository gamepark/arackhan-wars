import { FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'

export class IcePaladin extends WhitelandCardRule {
  kind = FactionCardKind.Creature
  attack = 2
  defense = 2
}
