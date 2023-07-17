import { FactionCardRule } from './base/FactionCardRule'
import { RuleId } from '../../RuleId'

export class TeleportationRule extends FactionCardRule {

  actionRule() {
    const cardPosition = this.item.getItem()!.location
    return [
      this.rules().startPlayerTurn(RuleId.TeleportationActionRule, cardPosition.player!)
    ]
  }

  afterActivation() {
    return [
      ...super.afterActivation(),
      ...this.discardCard()
    ]
  }

  onTurnEnd() {
    return this.discardCard()
  }
}
