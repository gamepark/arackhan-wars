import { FactionCard } from '../../../../material/FactionCard'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { perforation } from '../../rules/attribute'

export class SiegeTower extends Creature {
  id = FactionCard.SiegeTower
  faction = Faction.GrayOrder

  value = 10
  attack = 4
  defense = 1

  attribute = perforation
}
