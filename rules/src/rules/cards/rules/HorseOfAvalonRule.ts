import { FactionCardRule } from './base/FactionCardRule'

export class HorseOfAvalonRule extends FactionCardRule {

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
