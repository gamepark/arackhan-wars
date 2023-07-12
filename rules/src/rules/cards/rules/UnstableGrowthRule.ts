import { FactionCardRule } from './base/FactionCardRule'
import { CardModification } from './base/EffectRule'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'

export class UnstableGrowthRule extends FactionCardRule {

  isEffectApplicable(_cardIndex: number, isAlly: boolean): boolean {
    return isAlly
  }

  getAttackModifier(): CardModification | undefined {
    return {
      attack: 2,
      defense: -1
    }
  }

  onRoundEnd(): MaterialMove[] {
    return super.discardCard()
  }
}
