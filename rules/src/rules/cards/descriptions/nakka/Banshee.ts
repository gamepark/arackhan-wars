import { FactionCard } from '../../../../material/FactionCard'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { initiative } from '../../rules/attribute'

export class Banshee extends Creature {
  id = FactionCard.Banshee
  faction = Faction.Nakka

  value = 6
  attack = 2
  defense = 1

  attribute = initiative
}
