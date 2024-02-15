import { Faction } from '../../Faction'
import { immuneToEnemySpells } from '../Ability'
import { movement } from '../Attribute'
import { Creature } from '../Creature'
import { Family } from '../Family'

export class GreyKnight extends Creature {
  faction = Faction.GreyOrder
  value = 9
  deckBuildingValue = 15
  limit = 4

  family = Family.Legion6
  attack = 2
  defense = 2

  attribute = movement(2)
  skill = immuneToEnemySpells()
}
