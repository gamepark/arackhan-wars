import { Faction } from '../../Faction'
import { Land } from '../Land'

export class MastersOfAracKhan extends Land {
  faction = Faction.GreyOrder
  value = 10
  holo = true

  defense = 4

  // TODO benefits & weakness
}
