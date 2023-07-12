import { FactionCardRule } from './base/FactionCardRule'

export class ForcedExileRule extends FactionCardRule {

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
