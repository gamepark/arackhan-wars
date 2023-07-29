import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { PlayerTurnRule, RuleMove, RuleMoveType, RuleStep } from '@gamepark/rules-api'
import { PlayerId } from '../ArackhanWarsOptions'

/**
 * All rule steps in the activation phase extends this rule in order to propagate the memory of effects that last during a player's turn, such as Mimicry action
 */
export abstract class ActivationPhaseRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  onRuleStart(move: RuleMove, previousRule?: RuleStep) {
    if (move.type === RuleMoveType.StartRule) {
      this.memorize({ turnEffects: previousRule?.memory?.turnEffects })
    }
    return super.onRuleStart(move, previousRule)
  }
}
