import { FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

abstract class BlightCardRule extends FactionCardRule {
  faction = Faction.Blight

}

export {
  BlightCardRule
}
