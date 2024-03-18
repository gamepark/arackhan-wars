import { isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { CustomMoveType } from '../material/CustomMoveType'
import { publisherDecks } from '../material/decks/PublisherDecks'
import { FactionCard } from '../material/FactionCard'
import { ChooseFactionRule } from './ChooseFactionRule'
import { DeckValidator } from './DeckValidator'

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

  getActivePlayerLegalMoves(player: number) {
    return publisherDecks.map(cards => this.rules().customMove(CustomMoveType.ChooseDeck, { player, cards }))
  }
}
