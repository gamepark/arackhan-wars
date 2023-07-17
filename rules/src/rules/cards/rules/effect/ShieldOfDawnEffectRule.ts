import { CardModification, EffectRule } from '../base/EffectRule'

export class ShieldOfDawnEffectRule extends EffectRule {
  isApplicable(isAlly: boolean): boolean {
    return isAlly
  }

  getAttackModifier(): CardModification | undefined {
    return {
      defense: 1
    }
  }
}
