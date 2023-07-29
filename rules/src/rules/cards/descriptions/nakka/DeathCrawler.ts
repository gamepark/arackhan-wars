import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class DeathCrawler extends Creature {
  faction = Faction.Nakka
  value = 2

  attack = 2
  defense = 0
}
