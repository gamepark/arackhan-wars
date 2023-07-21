import { FactionCard } from '../../../../material/FactionCard'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { flight } from '../../rules/attribute'

export class MountedBanshee extends Creature {
  id = FactionCard.MountedBanshee
  faction = Faction.Nakka

  value = 10
  attack = 2
  defense = 2

  attribute = flight
}
