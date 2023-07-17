import { CardModification, EffectRule } from '../base/EffectRule'

export class CarnivorousPlantEffectRule extends EffectRule {

  isApplicable(isAlly: boolean): boolean {
    return isAlly
  }

  getAttackModifier(isAlly: boolean): CardModification | undefined {
    if (!isAlly) return
    return {
      defense: 1
    }
  }
}
