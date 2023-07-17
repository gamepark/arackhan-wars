import { FactionCardRule } from './base/FactionCardRule'

export class IceMeteorRule extends FactionCardRule {

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
