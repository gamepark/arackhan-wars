import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from '../material/CustomMoveType'
import { PlayerId } from '../ArackhanWarsOptions'
import { LocationType } from '../material/LocationType'
import { getCardRule } from './CardRule'
import { Memory } from './Memory'
import { Attack } from './AttackRule'
import { onBattlefieldAndAstralPlane } from '../material/Board'

export class ActionRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  getPlayerMoves(): MaterialMove[] {
    return this.availableCards
      .filter(index => getCardRule(this.game, index).canPerformAction)
      .map(index => this.rules().customMove(CustomMoveType.PerformAction, index))
  }

  get availableCards() {
    const movedCard = this.remind<number[]>(Memory.MovedCards)
    if (movedCard.length) {
      return [movedCard[0]]
    }
    const attacks = this.remind<Attack[]>(Memory.Attacks)
    return this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)
      .getIndexes()
      .filter(index => !attacks.some(attack => attack.card === index))
  }
}
