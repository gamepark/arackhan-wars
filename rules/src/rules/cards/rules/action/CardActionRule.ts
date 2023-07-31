import { RuleMove } from '@gamepark/rules-api/dist/material/moves/rules/RuleMove'
import { RuleStep } from '@gamepark/rules-api/dist/material/rules/RuleStep'
import { MaterialMove } from '@gamepark/rules-api/dist/material/moves/MaterialMove'
import { discardCard } from '../../../../utils/discard.utils'
import { MaterialType } from '../../../../material/MaterialType'
import { PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { LocationType } from '../../../../material/LocationType'
import { Memory } from '../../../Memory'
import { RuleId } from '../../../RuleId'

export abstract class CardActionRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove, previousRule?: RuleStep): MaterialMove[] {
    this.memorize(Memory.PreviousRule, previousRule!.id)
    return []
  }

  afterCardAction(): MaterialMove[] {
    const previousRule = this.remind<RuleId>(Memory.PreviousRule)
    const card = this.remind(Memory.Card)
    this.forget(Memory.PreviousRule)
    this.forget(Memory.Card)
    return [
      ...discardCard(this.material(MaterialType.FactionCard).index(card)),
      this.rules().startPlayerTurn(previousRule, this.player)
    ]
  }
}
