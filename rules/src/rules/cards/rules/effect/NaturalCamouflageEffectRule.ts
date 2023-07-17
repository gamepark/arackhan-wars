import { EffectRule } from '../base/EffectRule'

export class NaturalCamouflageEffectRule extends EffectRule {
  blockAttack = true

  isApplicable(isAlly: boolean): boolean {
    return isAlly
  }
}
