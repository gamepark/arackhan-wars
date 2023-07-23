import { RuleId } from './RuleId'
import { ActivationRule } from './ActivationRule'
import { MaterialMove } from '@gamepark/rules-api'

export class InitiativeActivationRule extends ActivationRule {

  endTurnMove = () => {
    if (this.player === this.game.players[1]) {
      return this.rules().startPlayerTurn(RuleId.ActivationRule, this.nextPlayer)
    }

    return this.rules().startPlayerTurn(RuleId.InitiativeActivationRule, this.nextPlayer)
  }

  onRuleEnd(): MaterialMove[] {
    return []
  }
}
