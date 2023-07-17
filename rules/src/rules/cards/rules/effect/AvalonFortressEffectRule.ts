import { EffectRule } from '../base/EffectRule'

export class AvalonFortressEffectRule extends EffectRule {
  isApplicable(isAlly: boolean): boolean {
    return isAlly
  }

  getAttackModifier() {
    return {
      attack: 1,
      defense: 1
    }
  }
}
