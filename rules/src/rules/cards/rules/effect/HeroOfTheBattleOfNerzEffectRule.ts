import { CardModification, EffectRule } from '../base/EffectRule'

export class HeroOfTheBattleOfNerzEffectRule extends EffectRule {

  isApplicable(isAlly: boolean): boolean {
    return isAlly
  }

  getAttackModifier(): CardModification | undefined {
    return {
      defense: 1
    }
  }
}
