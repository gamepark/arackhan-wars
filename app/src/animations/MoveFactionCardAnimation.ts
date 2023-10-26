import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { MaterialAnimationContext, MoveItemAnimations } from '@gamepark/react-game'
import { MoveItem } from '@gamepark/rules-api'

export class MoveFactionCardAnimation extends MoveItemAnimations {
  getPreDuration(move: MoveItem, context: MaterialAnimationContext): number {
    if (context.game.rule?.id === RuleId.Mulligan && move.location.type === LocationType.PlayerHand) {
      return 0.2
    }
    return super.getPreDuration(move, context)
  }
}