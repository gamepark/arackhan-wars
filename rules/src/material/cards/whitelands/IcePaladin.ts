import { Creature } from '../Creature'
import { Faction } from '../../Faction'
import { Family } from '../Family'

export class IcePaladin extends Creature {
  faction = Faction.Whitelands
  value = 5

  family = Family.IceGuard
  attack = 2
  defense = 2
}
