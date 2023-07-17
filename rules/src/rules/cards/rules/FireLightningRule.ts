import { FactionCardRule } from './base/FactionCardRule'

export class FireLightningRule extends FactionCardRule {

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
