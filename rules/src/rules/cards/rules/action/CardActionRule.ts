import { ActionMemory, ActionRuleMemory } from './ActionMemory'
import { RuleMove } from '@gamepark/rules-api/dist/material/moves/rules/RuleMove'
import { RuleStep } from '@gamepark/rules-api/dist/material/rules/RuleStep'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { discardCard } from '../../../../utils/discard.utils'
import { MaterialType } from '../../../../material/MaterialType'
import { ActivationPhaseRule } from '../../../ActivationPhaseRule'

export abstract class CardActionRule extends ActivationPhaseRule {
  onRuleStart(_move: RuleMove, previousRule?: RuleStep): MaterialMove[] {
    this.memorize<ActionMemory>({ previousRule: previousRule!.id })
    return []
  }

  afterCardAction(): MaterialMove[] {
    const { previousRule } = this.getMemory<ActionMemory>()
    const { card } = this.getMemory<ActionRuleMemory>()
    return [
      ...discardCard(this.material(MaterialType.FactionCard).index(card)),
      this.rules().startPlayerTurn(previousRule, this.player)
    ]
  }
}
