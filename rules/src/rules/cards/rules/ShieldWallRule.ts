import { FactionCardRule } from './base/FactionCardRule'

export class ShieldWallRule extends FactionCardRule {

  // TODO: Code the effect
  onRoundEnd() {
    return this.discardCard()
  }
}
