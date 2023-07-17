import { EffectRule } from '../base/EffectRule'

export class BlizzardEffectRule extends EffectRule {

  blockSkills = true
  blockAllAttributes = true

  isApplicable(isAlly: boolean): boolean {
    return !isAlly
  }
}
