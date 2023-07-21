import { LocationType } from '../material/LocationType'
import { CustomMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from '../material/CustomMoveType'
import { RuleId } from './RuleId'
import { PlayerId } from '../ArackhanWarsOptions'

type StartPlayerMemory = {
  startPlayer: number
}

const HAND_LENGTH = 7

export class MulliganRule extends SimultaneousRule<PlayerId, MaterialType, LocationType> {

  getLegalMoves(player: PlayerId): MaterialMove<PlayerId, MaterialType, LocationType>[] {

    if (!this.isTurnToPlay(player)) {
      return []
    }

    const cardsInHand = this
      .material(MaterialType.FactionCard)
      .location(LocationType.Hand)
      .player(player)


    const moves: MaterialMove[] =
      cardsInHand.moveItems({
        location: {
          type: LocationType.PlayerDeck,
          player
        }
      })

    if (cardsInHand.length < HAND_LENGTH) {
      moves.push(this.rules().customMove(CustomMoveType.Mulligan, { player }))
    } else {
      moves.push(this.rules().endPlayerTurn(player))
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

    const moves: MaterialMove[] = [cardsInDeck.shuffle()]

    const cardsInHand = this
      .material(MaterialType.FactionCard)
      .location(LocationType.Hand)
      .player(player)
      .length

    moves.push(
      ...cardsInDeck
        .sort(card => -card.location.x!)
        .limit(HAND_LENGTH - cardsInHand)
        .moveItems({ location: { type: LocationType.Hand, player } })
    )

    moves.push(this.rules().endPlayerTurn(player))

    return moves
  }

  getMovesAfterPlayersDone() {
    return [this.rules().startPlayerTurn(RuleId.PlacementRule, this.getMemory<StartPlayerMemory>().startPlayer)]
  }
}
