import { FactionCard } from '../../../../material/FactionCard'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class DeathCrawler extends Creature {
  id = FactionCard.DeathCrawler
  faction = Faction.Nakka

  value = 2
  attack = 2
  defense = 0
}
