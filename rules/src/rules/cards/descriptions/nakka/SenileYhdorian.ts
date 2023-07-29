import { FactionCard } from '../../../../material/FactionCard'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'

export class SenileYhdorian extends Creature {
  id = FactionCard.SenileYhdorian
  faction = Faction.Nakka

  value = 5
  attack = 1
  defense = 3
}
