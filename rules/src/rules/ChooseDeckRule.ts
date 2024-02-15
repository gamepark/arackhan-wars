import { publisherDecks } from '@gamepark/arackhan-wars-app/src/deckbuilding/decks/PublisherDecks'
import { CustomMove, isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { CustomMoveType } from '../material/CustomMoveType'
import { FactionCard, FactionCardsCharacteristics } from '../material/FactionCard'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { ChooseFactionRule } from './ChooseFactionRule'
import { DeckValidator } from './DeckValidator'
import { RuleId } from './RuleId'

export type ChooseDeck = {
  player: number
  cards: FactionCard[]
}

export class ChooseDeckRule extends ChooseFactionRule {

  isLegalMove(player: number, move: MaterialMove) {
    if (!this.isTurnToPlay(player)) return false
    if (!isCustomMoveType(CustomMoveType.ChooseDeck)(move)) return false
    const chooseDeck: ChooseDeck = move.data
    return player === chooseDeck.player && new DeckValidator(chooseDeck.cards).isValid
  }

  getLegalMoves(player: number) {
    return publisherDecks.map(cards => this.rules().customMove(CustomMoveType.ChooseDeck, { player, cards }))
  }

  onCustomMove(move: CustomMove) {
    if (move.type !== CustomMoveType.ChooseDeck) return []
    const chooseDeck: ChooseDeck = move.data
    return [
      this.material(MaterialType.FactionCard).createItemsAtOnce(
        chooseDeck.cards.map((card: FactionCard) => ({
          id: { front: card, back: FactionCardsCharacteristics[card].faction },
          location: { type: LocationType.PlayerDeck, player: chooseDeck.player }
        }))
      ),
      this.rules().endPlayerTurn(chooseDeck.player)]
  }

  getMovesAfterPlayersDone() {
    return [this.rules().startPlayerTurn(RuleId.ChooseStartPlayer, this.game.players[0])]
  }
}
