import { Creature } from '../Creature'
import { Faction } from '../../Faction'
import { Family } from '../Family'

export class SenileYhdorian extends Creature {
  faction = Faction.Nakka
  value = 5

  family = Family.Yhdorian
  attack = 1
  defense = 3
}
