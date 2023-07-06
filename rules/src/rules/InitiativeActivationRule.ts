import { RuleId } from './RuleId'
import { ActivationRule } from './ActivationRule'

export class InitiativeActivationRule extends ActivationRule {
  initiative = true

  endTurnMove = () => {
    if (this.player === this.game.players[1]) {
      return [this.rules().startRule(RuleId.ActivationRule, this.nextPlayer)]
    }

    return [this.rules().startPlayerTurn(RuleId.InitiativeActivationRule, this.nextPlayer)]
  }
}
