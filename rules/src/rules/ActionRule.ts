import { isDeadEndMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from '../material/CustomMoveType'
import { PlayerId } from '../ArackhanWarsOptions'
import { LocationType } from '../material/LocationType'
import { getCardRule } from './CardRule'
import { Memory } from './Memory'
import { Attack } from './AttackRule'
import { onBattlefieldAndAstralPlane } from '../material/Board'
import { ArackhanWarsRules } from '../ArackhanWarsRules'
import { RuleId } from './RuleId'

export class ActionRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  getPlayerMoves(): MaterialMove[] {
    return this.availableCards
      .filter(index => getCardRule(this.game, index).canPerformAction)
      .map(index => this.rules().customMove(CustomMoveType.PerformAction, index))
      .filter(move => !isDeadEndMove(move, this.game, ArackhanWarsRules, game => game.rule?.id === RuleId.ActivationRule))
  }

  get availableCards() {
    if (this.remind<Attack[]>(Memory.Attacks).length > 0) return []
    const movedCard = this.remind<number[]>(Memory.MovedCards)
    if (movedCard.length) {
      return [movedCard[0]]
    }
    return this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)
      .getIndexes()
  }
}
