import { FactionCardDetail } from '../FactionCardDetail'
import { Faction } from '../../../../Faction'

abstract class WhitelandCard extends FactionCardDetail {
  faction = Faction.Whitelands
}

export {
  WhitelandCard
}
