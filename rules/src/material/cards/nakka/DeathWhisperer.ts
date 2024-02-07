import { Faction } from '../../Faction'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class DeathWhisperer extends Creature {
  faction = Faction.Nakka
  value = 5

  family = Family.Musician
  attack = 1
  defense = 1

  // TODO skills
}
