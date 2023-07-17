import { EffectRule } from '../base/EffectRule'

export class FirestormEffectRule extends EffectRule {

  blockSkills = true
  blockAllAttributes = true

  isApplicable(isAlly: boolean): boolean {
    return !isAlly
  }

  getAttackModifier() {
    return {
      attack: -1,
      defense: -1
    }
  }
}
