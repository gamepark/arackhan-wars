import { FactionCardDetail } from '../FactionCardDetail'
import { Faction } from '../../../../Faction'

abstract class NakkaCard extends FactionCardDetail {
  faction = Faction.Nakka
}

export {
  NakkaCard
}
