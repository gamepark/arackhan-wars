import { EffectRule } from '../base/EffectRule'

export class FortressOfMyjirEffectRule extends EffectRule {

  isApplicable(isAlly: boolean): boolean {
    return isAlly
  }

  getAttackModifier() {
    return {
      defense: 2
    }
  }
}
