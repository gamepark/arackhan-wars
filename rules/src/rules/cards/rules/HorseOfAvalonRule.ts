import { FactionCardRule } from './base/FactionCardRule'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { RuleId } from '../../RuleId'

export class HorseOfAvalonRule extends FactionCardRule {

  actionRule(): MaterialMove[] {
    const cardPosition = this.item.getItem()!.location
    return [
      ...this.afterActivation(),
      this.rules().startPlayerTurn(RuleId.HorseOfAvalonActionRule, cardPosition.player!, {
        position: { x: cardPosition.x, y: cardPosition.y }
      })
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
