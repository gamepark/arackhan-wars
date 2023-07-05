import { FactionCardKind } from '../FactionCardRule'
import { GrayOrderCardRule } from './GrayOrderCardRule'
import { FactionCardType } from '../../../material/FactionCardType'
import { MaterialRulesPart } from '@gamepark/rules-api/dist/material/rules/MaterialRulesPart'

export class HorseOfAvalon extends GrayOrderCardRule {
  kind = FactionCardKind.Spell
  type = FactionCardType.HorseOfAvalon

  afterActivation = (rules: MaterialRulesPart) => {
    return this.discardCard(rules)
  }

  onRoundEnd = (rules: MaterialRulesPart) => {
    return this.discardCard(rules)
  }
}
