import { Faction } from '../../Faction'
import { Creature } from '../Creature'

export class OneEyedHog extends Creature {
  faction = Faction.Nakka
  value = 1

  attack = 1
  defense = 1

  // TODO weakness
}
