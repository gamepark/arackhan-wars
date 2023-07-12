import { FactionCardRule } from './base/FactionCardRule'

export class AvalonFortressRule extends FactionCardRule {

  isEffectApplicable(_cardIndex: number, isAlly: boolean): boolean {
    return isAlly
  }

  getAttackModifier() {
    return {
      attack: 1,
      defense: 1
    }
  }
}
