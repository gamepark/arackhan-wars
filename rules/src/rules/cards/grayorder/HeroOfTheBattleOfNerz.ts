import { FactionCardKind, FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

export class HeroOfTheBattleOfNerz extends FactionCardRule {
  faction = Faction.GrayOrder
  kind = FactionCardKind.Creature
  attack = 2
  defense = 3
}
