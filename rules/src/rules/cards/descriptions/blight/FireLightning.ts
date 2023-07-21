import { FactionCard } from '../../../../material/FactionCard'
import { Faction } from '../../../../Faction'
import { Spell } from '../base/Spell'
import { DiscardTiming } from '../base/FactionCardDetail'
import { rangedAttack } from '../../rules/attribute'

export class FireLightning extends Spell {
  id = FactionCard.FireLightning
  faction = Faction.Blight

  value = 2
  attack = 2

  attribute = rangedAttack(3)

  discardTiming = DiscardTiming.ActivationOrEndOfTurn

  quantity = 2
}
