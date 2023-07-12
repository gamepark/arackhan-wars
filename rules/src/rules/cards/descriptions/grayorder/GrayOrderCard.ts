import { Faction } from '../../../../Faction'
import { FactionCardDetail } from '../FactionCardDetail'

abstract class GrayOrderCard extends FactionCardDetail {
  faction = Faction.GrayOrder

}

export {
  GrayOrderCard
}
