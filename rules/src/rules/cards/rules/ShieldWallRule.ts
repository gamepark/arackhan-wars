import { FactionCardRule } from './base/FactionCardRule'

export class ShieldWallRule extends FactionCardRule {
  onRoundEnd = () => {
    return this.discardCard()
  }
}
