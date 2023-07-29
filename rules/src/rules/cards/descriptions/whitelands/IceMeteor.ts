import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { rangedAttack } from '../../rules/attribute'

export class IceMeteor extends Spell {
  faction = Faction.Whitelands
  value = 1

  attack = 2
  defense = 2

  attribute = rangedAttack(3)
}
