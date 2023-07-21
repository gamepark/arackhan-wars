import { FactionCard } from '../../../../material/FactionCard'
import { onlyNotGroupedAttack } from '../../rules/effect/OnlyNotGroupedAttack'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'

export class SwampTroll extends Creature {
  id = FactionCard.SwampTroll
  faction = Faction.Blight

  value = 4
  attack = 2
  defense = 1

  skill = onlyNotGroupedAttack

  quantity = 3
}
