import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { MaterialType } from '../../../../material/MaterialType'
import { PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { LocationType } from '../../../../material/LocationType'
import { Memory } from '../../../Memory'
import { RuleId } from '../../../RuleId'

export abstract class CardActionRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  get actionCard() {
    return this.material(MaterialType.FactionCard).getItem(this.remind(Memory.ActionCard))!
  }

  afterCardAction(): MaterialMove[] {
    const moves: MaterialMove[] = []
    if (this.actionCard.location.type !== LocationType.PlayerDiscard) {
      moves.push(this.discardActionCard())
    }
    moves.push(this.rules().startRule(RuleId.ActivationRule))
    this.forget(Memory.ActionCard)
    return moves
  }

  discardActionCard() {
    return this.material(MaterialType.FactionCard).index(this.remind(Memory.ActionCard)).moveItem({
      location: { type: LocationType.PlayerDiscard, player: this.player }
    })
  }


}
