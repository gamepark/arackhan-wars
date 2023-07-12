import { FactionCardRule } from './base/FactionCardRule'

export class TeleportationRule extends FactionCardRule {

  afterActivation = () => {
    return [
      ...super.afterActivation(),
      ...this.discardCard()
    ]
  }

  onTurnEnd = () => {
    return this.discardCard()
  }
}
