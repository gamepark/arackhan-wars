import { FactionCardRule } from './base/FactionCardRule'

export class MimicryRule extends FactionCardRule {

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
