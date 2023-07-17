import { CardModification, EffectRule } from '../base/EffectRule'

export class WesternForgeEffectRule extends EffectRule {
  isApplicable(isAlly: boolean): boolean {
    return isAlly
  }

  getAttackModifier(): CardModification | undefined {
    return {
      attack: 2
    }
  }
}
