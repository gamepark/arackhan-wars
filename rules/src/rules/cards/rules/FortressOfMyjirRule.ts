import { FactionCardRule } from './base/FactionCardRule'

export class FortressOfMyjirRule extends FactionCardRule {

  isEffectApplicable(_cardIndex: number, isAlly: boolean): boolean {
    return isAlly
  }

  getAttackModifier() {
    return {
      defense: 2
    }
  }
}
