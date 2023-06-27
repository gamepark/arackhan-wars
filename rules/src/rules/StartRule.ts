import { LocationType } from '../material/LocationType'
import { CustomMove, MaterialItem, MaterialMove, MaterialRulesPart, MoveKind } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from '../material/CustomMoveType'
import { RuleId } from './RuleId'
import { PlayerId } from '../ArackhanWarsOptions'

type StartRulePlayerMemory = {
  end?: boolean
}

const HAND_LENGTH = 7

export class StartRule extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {

  getLegalMoves(playerId: PlayerId): MaterialMove<PlayerId, MaterialType, LocationType>[] {

    if (this.getMemory<StartRulePlayerMemory>(playerId)?.end) {
      return []
    }

    const cardsInHand = this
      .material(MaterialType.FactionCard)
      .location(LocationType.Hand)
      .player(playerId)


    const discardCards =
      cardsInHand.moveItems({
        location: {
          type: LocationType.PlayerDeck,
          player: playerId
        }
      })

    if (cardsInHand.length < HAND_LENGTH) {
      return [
        ...discardCards,
        this.rules().customMove(CustomMoveType.Mulligan, { player: playerId })
      ]
    }

    return [
      // TODO: Improve rules() to ass endTurn() to handle simultaneous players
      ...discardCards,
      this.rules().customMove(CustomMoveType.Pass, { player: playerId })
    ]
  }

  nextPlayer(player: PlayerId): PlayerId {
    return this.game.players[(this.game.players.indexOf(player) + 1) % this.game.players.length]
  }

  onCustomMove(move: CustomMove): MaterialMove<PlayerId, MaterialType, LocationType>[] {
    const moves = []

    if (move.type === CustomMoveType.Pass) {
      this.memorize<StartRulePlayerMemory>({ end: true }, move.data.player)
    }

    if (move.type === CustomMoveType.Mulligan) {
      const cardsInDeck = this
        .material(MaterialType.FactionCard)
        .location(LocationType.PlayerDeck)
        .player(move.data.player)

      const cardsInHand = this
        .material(MaterialType.FactionCard)
        .location(LocationType.Hand)
        .player(move.data.player)
        .length

      this.memorize<StartRulePlayerMemory>({ end: true }, move.data.player)

      moves.push(
        cardsInDeck.shuffle(),
        ...cardsInDeck
          .sort((item: MaterialItem) => -item.location.x!)
          .limit(HAND_LENGTH - cardsInHand)
          .moveItems({ location: { type: LocationType.Hand, player: move.data.player } })
      )
    }


    if (this.game.players.every((p) => this.getMemory<StartRulePlayerMemory>(p).end)) {
      moves.push(this.rules().startRule(RuleId.PlacementRule, this.game.players[0]))
    }

    return moves
  }

  isUnpredictableMove(move: MaterialMove<PlayerId, MaterialType, LocationType>, player: PlayerId): boolean {
    return super.isUnpredictableMove?.(move, player) || (move.kind === MoveKind.CustomMove && move.type === CustomMoveType.Mulligan)
  }

  isTurnToPlay(playerId: PlayerId): boolean {
    return !this.getMemory<StartRulePlayerMemory>(playerId)?.end
  }
}
