import { FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

abstract class GrayOrderCardRule extends FactionCardRule {
  faction = Faction.GrayOrder

}

export {
  GrayOrderCardRule
}
