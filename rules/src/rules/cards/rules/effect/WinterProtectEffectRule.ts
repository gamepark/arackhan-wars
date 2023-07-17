import { EffectRule } from '../base/EffectRule'

export class WinterProtectEffectRule extends EffectRule {
  isApplicable(isAlly: boolean): boolean {
    return isAlly
  }

  getAttackModifier() {
    return {
      defense: 2
    }
  }
}
