import { FactionCardRule } from '../FactionCardRule'
import { Faction } from '../../../Faction'

abstract class NakkaCardRule extends FactionCardRule {
  faction = Faction.Nakka

}

export {
  NakkaCardRule
}
