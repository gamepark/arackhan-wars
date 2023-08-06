import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { LocationType } from '../../../../material/LocationType'
import { getCardRule } from './CardRule'
import { Memory } from '../../../Memory'
import { Attack } from './AttackRule'

export class ActionRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  getPlayerMoves(): MaterialMove[] {
    const moves = []

    const attacks = this.remind<Attack[]>(Memory.Attacks)

    const playerCards = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)

    for (const cardIndex of playerCards.getIndexes()) {
      if (!attacks.some(attack => attack.card === cardIndex) && getCardRule(this.game, cardIndex).canPerformAction) {
        moves.push(this.rules().customMove(CustomMoveType.PerformAction, cardIndex))
      }
    }

    return moves
  }
}
