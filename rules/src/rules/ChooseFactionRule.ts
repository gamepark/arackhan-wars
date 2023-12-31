import { CustomMove, SimultaneousRule } from '@gamepark/rules-api'
import { PreBuildDecks } from '../material/cards/PreBuildDecks'
import { CustomMoveType } from '../material/CustomMoveType'
import { Faction, factions } from '../material/Faction'
import { FactionToken } from '../material/FactionToken'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class ChooseFactionRule extends SimultaneousRule {

  getLegalMoves(player: number) {
    if (!this.isTurnToPlay(player)) return []
    return factions.map(faction => this.rules().customMove(CustomMoveType.ChooseFaction, { player, faction }))
  }

  onCustomMove(move: CustomMove) {
    if (move.type !== CustomMoveType.ChooseFaction) return []
    if (move.data.faction !== undefined) {
      this.memorize(Memory.PlayerFaction, move.data.faction, move.data.player)
    }
    return [this.rules().endPlayerTurn(move.data.player)]
  }

  getMovesAfterPlayersDone() {
    const moves = []
    for (const player of this.game.players) {
      const faction = this.remind<Faction | undefined>(Memory.PlayerFaction, player)
      if (faction === undefined) return [] // Faction choice is hidden to the opponent
      moves.push(...this.material(MaterialType.FactionCard).createItems(
          PreBuildDecks[faction].map(card => ({ id: { front: card, back: faction }, location: { type: LocationType.PlayerDeck, player } }))
        )
      )
    }
    moves.push(this.rules().startPlayerTurn(RuleId.ChooseStartPlayer, this.game.players[0]))
    return moves
  }

  onRuleEnd() {
    this.provideFactionTokens()
    return this.game.players.map(player =>
      this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).player(player).shuffle()
    )
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
    this.forget(Memory.PlayerFaction)
  }
}
