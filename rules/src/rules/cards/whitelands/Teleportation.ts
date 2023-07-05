import { CardAttributeType, FactionCardKind } from '../FactionCardRule'
import { WhitelandCardRule } from './WhitelandCardRule'
import { FactionCardType } from '../../../material/FactionCardType'
import { MaterialRulesPart } from '@gamepark/rules-api/dist/material/rules/MaterialRulesPart'

export class Teleportation extends WhitelandCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.Teleportation
  astral = true
  attributes = [{ type: CardAttributeType.Initiative }]

  afterActivation = (rules: MaterialRulesPart) => {
    return this.discardCard(rules)
  }

  onRoundEnd = (rules: MaterialRulesPart) => {
    return this.discardCard(rules)
  }
}
