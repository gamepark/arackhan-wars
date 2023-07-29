import { FactionCard } from '../../../../material/FactionCard'
import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { rangedAttack } from '../../rules/attribute'

export class NakkaArcher extends Creature {
  id = FactionCard.NakkaArcher
  faction = Faction.Nakka

  value = 3
  attack = 1
  defense = 1

  attribute = rangedAttack(2)
}
