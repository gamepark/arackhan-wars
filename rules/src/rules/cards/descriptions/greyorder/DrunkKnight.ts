import { drunkKnight } from '../../rules/effect/DrunkKnightWeaknessEffect'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class DrunkKnight extends Creature {
  faction = Faction.GreyOrder
  value = 1

  attack = 1
  defense = 1

  weakness = drunkKnight
}
