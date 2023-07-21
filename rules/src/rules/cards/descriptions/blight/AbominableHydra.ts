import { FactionCard } from '../../../../material/FactionCard'
import { Faction } from '../../../../Faction'
import { Creature } from '../base/Creature'
import { omnistrike } from '../../rules/attribute'

export class AbominableHydra extends Creature {
  id = FactionCard.AbominableHydra
  faction = Faction.Blight

  value = 12
  attack = 3
  defense = 2

  attribute = omnistrike
}
