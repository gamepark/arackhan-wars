import { CustomMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { CustomMoveType } from '../material/CustomMoveType'
import { FactionToken } from '../material/FactionToken'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export const START_HAND = 7

export class MulliganRule extends SimultaneousRule {
  onRuleStart() {
    const moves: MaterialMove[] = this.game.players.flatMap(player =>
      this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).player(player)
        .deck().deal({ type: LocationType.PlayerHand, player }, START_HAND)
    )
    if (!this.material(MaterialType.RoundTrackerToken).length) {
      const firstPlayer = this.remind(Memory.StartPlayer)
      moves.push(this.material(MaterialType.RoundTrackerToken).createItem(
        {
          id: {
            front: this.getPlayerFactionToken(firstPlayer),
            back: this.getPlayerFactionToken(firstPlayer === 1 ? 2 : 1)
          },
          location: { type: LocationType.RoundTracker, x: 1 }
        }
      ))
    }
    return moves
  }

  getPlayerFactionToken(player: number) {
    return this.remind<FactionToken>(Memory.PlayerFactionToken, player)
  }

  getActivePlayerLegalMoves(player: number) {
    const cardsInHand = this.material(MaterialType.FactionCard).location(LocationType.PlayerHand).player(player)
    const moves: MaterialMove[] = cardsInHand.moveItems({ type: LocationType.PlayerDeck, player })

    if (cardsInHand.length < START_HAND) {
      moves.push(this.customMove(CustomMoveType.Mulligan, { player }))
    } else {
      moves.push(this.endPlayerTurn(player))
    }

    return moves
  }

  onCustomMove(move: CustomMove) {
    if (move.type !== CustomMoveType.Mulligan) return []

    const player = move.data.player

    const cardsInDeck = this
      .material(MaterialType.FactionCard)
      .location(LocationType.PlayerDeck)
      .player(player)

    const moves: MaterialMove[] = [
      this.endPlayerTurn(player),
      cardsInDeck.shuffle()
    ]

    const cardsInHand = this
      .material(MaterialType.FactionCard)
      .location(LocationType.PlayerHand)
      .player(player)
      .length

    moves.push(
      ...cardsInDeck
        .sort(card => -card.location.x!)
        .limit(START_HAND - cardsInHand)
        .moveItems({ type: LocationType.PlayerHand, player })
    )

    return moves
  }

  getMovesAfterPlayersDone() {
    return [this.startPlayerTurn(RuleId.PlacementRule, this.remind(Memory.StartPlayer))]
  }
}
