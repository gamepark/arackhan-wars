import { LocationType } from '../material/LocationType'
import { CustomMove, MaterialItem, MaterialMove, MaterialRulesPart, MoveKind } from '@gamepark/rules-api'
import { Faction } from '../Faction'
import { MaterialType } from '../material/MaterialType'
import { CustomMoveType } from '../material/CustomMoveType'
import { RuleId } from './RuleId'

type StartRulePlayerMemory = {
  end?: boolean
}

const HAND_LENGTH = 7

export class StartRule extends MaterialRulesPart<Faction, MaterialType, LocationType> {

  getLegalMoves(playerId: Faction): MaterialMove<Faction, MaterialType, LocationType>[] {

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

  nextPlayer(player: Faction): Faction {
    return this.game.players[(this.game.players.indexOf(player) + 1) % this.game.players.length]
  }

  onCustomMove(move: CustomMove): MaterialMove<Faction, MaterialType, LocationType>[] {
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

  isUnpredictableMove(move: MaterialMove<Faction, MaterialType, LocationType>, player: Faction): boolean {
    return super.isUnpredictableMove?.(move, player) || (move.kind === MoveKind.CustomMove && move.type === CustomMoveType.Mulligan)
  }

  isTurnToPlay(playerId: Faction): boolean {
    return !this.getMemory<StartRulePlayerMemory>(playerId)?.end
  }
}
