import { FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

abstract class WhitelandCardRule extends FactionCardRule {
  faction = Faction.Whitelands
}

export {
  WhitelandCardRule
}
