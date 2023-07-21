import { FactionCard } from '../../../../material/FactionCard'
import { Spell } from '../base/Spell'
import { Faction } from '../../../../Faction'
import { DiscardTiming } from '../base/FactionCardDetail'

export class HorseOfAvalon extends Spell {
  faction = Faction.GrayOrder

  id = FactionCard.HorseOfAvalon
  value = 7

  discardTiming = DiscardTiming.ActivationOrEndOfTurn
}
