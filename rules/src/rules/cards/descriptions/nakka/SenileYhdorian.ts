import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'

export class SenileYhdorian extends Creature {
  faction = Faction.Nakka
  value = 5

  attack = 1
  defense = 3
}
