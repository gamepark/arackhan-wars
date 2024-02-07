import { Faction } from '../../Faction'
import { Creature } from '../Creature'

export class ExplosiveCentipede extends Creature {
  faction = Faction.Nakka
  value = 2

  attack = 2
  defense = 2

  // TODO weakness
}
