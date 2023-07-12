import { FactionCardRule } from './base/FactionCardRule'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'

export class TheFearRule extends FactionCardRule {
  onRoundEnd = () => {
    return this.discardCard()
  }

  beforeDiscard(): MaterialMove[] {

    // TODO: return faction tokens only for card that was not activated during the round
    // TODO: difference must be made between "activated cards" or "disabled cards"
    return []
  }
}
