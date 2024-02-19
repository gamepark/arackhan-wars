import { Faction } from '../../Faction'
import { endOfTurn } from '../Ability'
import { Creature } from '../Creature'
import { EndOfTurnAction } from '../Effect'

export class FrostMaiden extends Creature {
  faction = Faction.Whitelands
  value = 3

  attack = 1
  defense = 1

  skill = endOfTurn(EndOfTurnAction.Move)
}
