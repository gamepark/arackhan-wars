import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'

export abstract class CardActionRule extends PlayerTurnRule {
  get actionCard() {
    return this.material(MaterialType.FactionCard).getItem(this.remind(Memory.ActionCard))!
  }

  afterCardAction() {
    const moves: MaterialMove[] = []
    if (this.actionCard.location.type !== LocationType.PlayerDiscard) {
      moves.push(this.discardActionCard())
    }
    moves.push(this.rules().startRule(RuleId.ActivationRule))
    return moves
  }

  discardActionCard() {
    return this.material(MaterialType.FactionCard).index(this.remind(Memory.ActionCard))
      .moveItem({ type: LocationType.PlayerDiscard, player: this.player })
  }

  onRuleEnd() {
    this.forget(Memory.ActionCard)
    return []
  }
}
