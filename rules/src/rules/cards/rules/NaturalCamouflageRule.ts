import { FactionCardRule } from './base/FactionCardRule'

export class NaturalCamouflageRule extends FactionCardRule {
  blockAttack = true

  isEffectApplicable(_cardIndex: number, isAlly: boolean): boolean {
    return isAlly
  }
}
