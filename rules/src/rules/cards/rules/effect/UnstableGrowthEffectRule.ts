import { CardModification, EffectRule } from '../base/EffectRule'

export class UnstableGrowthEffectRule extends EffectRule {
  isApplicable(_isAlly: boolean): boolean {
    return _isAlly
  }

  getAttackModifier(): CardModification | undefined {
    return {
      attack: 2,
      defense: -1
    }
  }
}
