import { FactionCardRule } from './base/FactionCardRule'
import { MaterialItem } from '@gamepark/rules-api/dist/material/items/MaterialItem'
import { CardModification } from './base/EffectRule'

export class FirestormRule extends FactionCardRule {

  blockSkills = true
  blockAllAttributes = true

  onRoundEnd = () => {
    return this.discardCard()
  }

  isEffectApplicable(_cardIndex: number, isAlly: boolean): boolean {
    return !isAlly
  }

  getAttackModifier(_cardItem: MaterialItem, _cardIndex: number, _isAllied: boolean): CardModification | undefined {
    return {
      attack: -1,
      defense: -1
    }
  }
}
