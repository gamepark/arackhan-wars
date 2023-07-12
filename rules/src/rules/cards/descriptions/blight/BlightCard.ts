import { Faction } from '../../../../Faction'
import { FactionCardDetail } from '../FactionCardDetail'

abstract class BlightCard extends FactionCardDetail {
  faction = Faction.Blight

}

export {
  BlightCard
}
