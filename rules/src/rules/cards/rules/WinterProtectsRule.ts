import { FactionCardRule } from './base/FactionCardRule'

export class WinterProtectsRule extends FactionCardRule {

  isEffectApplicable(_cardIndex: number, isAlly: boolean): boolean {
    return isAlly
  }

  getAttackModifier() {
    return {
      defense: 2
    }
  }

  onRoundEnd = () => {
    return this.discardCard()
  }
}
