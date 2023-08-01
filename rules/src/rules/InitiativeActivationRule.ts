import { RuleId } from './RuleId'
import { ActivationRule } from './ActivationRule'
import { MaterialMove } from '@gamepark/rules-api'
import { Memory } from './Memory'

export class InitiativeActivationRule extends ActivationRule {

  get nextRuleMove(): MaterialMove {
    if (this.player === this.remind(Memory.StartPlayer)) {
      return this.rules().startPlayerTurn(RuleId.InitiativeActivationRule, this.nextPlayer)
    } else {
      return this.rules().startPlayerTurn(RuleId.ActivationRule, this.nextPlayer)
    }
  }

  onRuleEnd(): MaterialMove[] {
    return []
  }
}
