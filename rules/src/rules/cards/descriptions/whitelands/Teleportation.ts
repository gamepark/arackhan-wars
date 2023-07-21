import { DiscardTiming } from '../base/FactionCardDetail'
import { FactionCard } from '../../../../material/FactionCard'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { initiative } from '../../rules/attribute'

export class Teleportation extends Spell {
  id = FactionCard.Teleportation
  faction = Faction.Whitelands

  value = 4
  astral = true

  attribute = initiative

  discardTiming = DiscardTiming.ActivationOrEndOfTurn
}
