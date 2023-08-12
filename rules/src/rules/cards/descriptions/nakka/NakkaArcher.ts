import { Creature } from '../base/Creature'
import { Faction } from '../../../../Faction'
import { rangedAttack } from '../base/Attribute'

export class NakkaArcher extends Creature {
  faction = Faction.Nakka
  value = 3

  attack = 1
  defense = 1

  attribute = rangedAttack(2)
}
