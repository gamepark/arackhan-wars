import { FactionCardRule } from './base/FactionCardRule'
import { CardModification } from './base/EffectRule'

export class CarnivorousPlantRule extends FactionCardRule {

  isEffectApplicable(_cardIndex: number, isAlly: boolean): boolean {
    return isAlly
  }

  getAttackModifier(): CardModification | undefined {
    return {
      defense: 1
    }
  }

  // TODO: can only be attacked in group attack
}
