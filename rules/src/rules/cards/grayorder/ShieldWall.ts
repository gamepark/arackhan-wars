import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'
import { MaterialRulesPart } from '@gamepark/rules-api/dist/material/rules/MaterialRulesPart'
import { FactionCardType } from '../../../material/FactionCardType'

export class ShieldWall extends GrayOrderCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.ShieldWall
  astral = true

  onRoundEnd = (rules: MaterialRulesPart) => {
    return this.discardCard(rules)
  }
}
