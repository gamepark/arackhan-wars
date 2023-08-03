import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { LocationType } from '../../../../material/LocationType'
import { getCardRule } from './CardRule'

export class ActionRule extends PlayerTurnRule<PlayerId, MaterialType, LocationType> {
  getPlayerMoves(): MaterialMove[] {
    const playerCards = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)

    const moves = []
    for (const cardIndex of playerCards.getIndexes()) {
      const cardRule = getCardRule(this.game, cardIndex)
      const action = cardRule.characteristics.action
      if (action && cardRule.canBeActivated) {
        moves.push(this.rules().customMove(CustomMoveType.PerformAction, { card: cardIndex, action }))
      }
    }

    return moves
  }
}
