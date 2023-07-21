import { FactionCard } from '../../../../material/FactionCard'
import { drunkKnight } from '../../rules/effect/DrunkKnightWeaknessEffect'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class DrunkKnight extends Creature {
  id = FactionCard.DrunkKnight
  faction = Faction.GrayOrder

  value = 1
  attack = 1
  defense = 1

  weakness = drunkKnight

  quantity = 4
}
