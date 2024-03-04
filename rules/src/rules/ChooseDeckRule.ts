import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { CustomMoveType } from '../material/CustomMoveType'
import { publisherDecks } from '../material/decks/PublisherDecks'
import { FactionCard } from '../material/FactionCard'
import { ChooseFactionRule } from './ChooseFactionRule'
import { DeckValidator } from './DeckValidator'
import { Memory } from './Memory'

export type ChooseDeck = {
  player: number
  cards?: FactionCard[]
}

export class ChooseDeckRule extends ChooseFactionRule {

  isLegalMove(player: number, move: MaterialMove) {
    if (!this.isTurnToPlay(player)) return false
    if (!isCustomMoveType(CustomMoveType.ChooseDeck)(move)) return false
    const chooseDeck: ChooseDeck = move.data
    return player === chooseDeck.player && new DeckValidator(chooseDeck.cards ?? []).isValid
  }

  getLegalMoves(player: number) {
    return publisherDecks.map(cards => this.rules().customMove(CustomMoveType.ChooseDeck, { player, cards }))
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    if (move.type !== CustomMoveType.ChooseDeck) return []
    if (move.data.cards !== undefined) {
      this.memorize(Memory.PlayerDeck, move.data.cards, move.data.player)
    }
    return [this.rules().endPlayerTurn(move.data.player)]
  }

  getPlayerDeck(player: number): FactionCard[] {
    return this.remind<FactionCard[] | undefined>(Memory.PlayerDeck, player) ?? []
  }
}
