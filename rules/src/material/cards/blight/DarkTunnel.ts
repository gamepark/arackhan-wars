import { Faction } from '../../Faction'
import { Land } from '../Land'

export class DarkTunnel extends Land {
  faction = Faction.Blight
  legendary = false
  value = 7
  deckBuildingValue = 13

  defense = 3

  // TODO benefits
}
