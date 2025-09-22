import { CustomMove, isCreateItemsAtOnce, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { PreBuildDecks } from '../material/cards/PreBuildDecks'
import { CustomMoveType } from '../material/CustomMoveType'
import { Faction, factions } from '../material/Faction'
import { FactionCard, FactionCardsCharacteristics } from '../material/FactionCard'
import { FactionToken } from '../material/FactionToken'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ChooseFactionRule extends SimultaneousRule {

  getActivePlayerLegalMoves(player: number) {
    return factions.map(faction => this.customMove(CustomMoveType.ChooseFaction, { player, faction }))
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    switch (move.type) {
      case CustomMoveType.ChooseFaction:
        if (move.data.faction !== undefined) {
          this.memorize(Memory.PlayerDeck, PreBuildDecks[move.data.faction as Faction], move.data.player)
        }
        return [this.endPlayerTurn(move.data.player)]
      case CustomMoveType.ChooseDeck:
        if (move.data.cards !== undefined) {
          this.memorize(Memory.PlayerDeck, move.data.cards, move.data.player)
        }
        return [this.endPlayerTurn(move.data.player)]
      case CustomMoveType.RevealDecks:
        for (let i = 0; i < this.game.players.length; i++) {
          this.memorize(Memory.PlayerDeck, move.data[i], this.game.players[i])
        }
        break
    }
    return []
  }

  getMovesAfterPlayersDone() {
    const decks = this.game.players.map(player => this.remind<FactionCard[] | undefined>(Memory.PlayerDeck, player) ?? [])
    if (decks.some(deck => deck.length === 0)) {
      return []
    }
    const moves = []
    for (let i = 0; i < this.game.players.length; i++) {
      const player = this.game.players[i]
      moves.push(this.material(MaterialType.FactionCard).createItemsAtOnce(
        decks[i].map(card => ({
          id: { front: card, back: FactionCardsCharacteristics[card].faction },
          location: { type: LocationType.PlayerDeck, player }
        }))
      ))
    }
    moves.push(this.customMove(CustomMoveType.RevealDecks, decks))
    moves.push(this.startPlayerTurn(RuleId.ChooseStartPlayer, this.game.players[0]))
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isCreateItemsAtOnce(move) && move.itemType === MaterialType.FactionCard) {
      const player = move.items[0].location.player
      return [this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).player(player).shuffle()]
    }
    return []
  }

  onRuleEnd() {
    this.provideFactionTokens()
    return []
  }

  provideFactionTokens() {
    const playersWithoutTokens: number[] = []
    const remainingTokens = [...factions]
    for (const player of this.game.players) {
      const faction = this.material(MaterialType.FactionCard).player(player).getItem()?.id.back as Faction
      if (remainingTokens.includes(faction)) {
        remainingTokens.splice(remainingTokens.indexOf(faction), 1)
        this.memorize(Memory.PlayerFactionToken, faction, player)
      } else {
        playersWithoutTokens.push(player)
      }
    }
    if (playersWithoutTokens.length) {
      const neutralPlayer = playersWithoutTokens.pop()
      this.memorize(Memory.PlayerFactionToken, FactionToken.Neutral, neutralPlayer)
    }
    while (playersWithoutTokens.length > 0) {
      this.memorize(Memory.PlayerFactionToken, remainingTokens.pop(), playersWithoutTokens.pop())
    }
  }
}
