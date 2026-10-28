import { applyAutomaticMoves, MaterialGame, MaterialMove, playAction } from '@gamepark/rules-api'
import { describe, expect, it } from 'vitest'
import { ArackhanWarsRules } from './ArackhanWarsRules'
import { ArackhanWarsSetup } from './ArackhanWarsSetup'
import { onBattlefieldAndAstralPlane } from './material/Board'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import './rules/CardRule' // registers the card rule factory
import { NUMBER_OF_ROUNDS } from './rules/EndOfRoundRules'
import { RuleId } from './rules/RuleId'

type Game = MaterialGame<number, MaterialType, LocationType>

/**
 * Whole games played at random, from the faction or deck choice to the final score. Nothing here checks a rule in
 * particular: it checks that the rules always have a legal move to offer, that no card is lost or duplicated, and
 * that a game always reaches the end of the last round.
 */
const MOVES_PER_GAME = 5000
const DECK_SIZE = 23

const newGame = (deckbuilding: boolean): Game => new ArackhanWarsSetup().setup({ players: [{ id: 1 }, { id: 2 }], deckbuilding })

const playRandomGame = (deckbuilding: boolean, seed: number) => {
  const game = newGame(deckbuilding)
  let rules = new ArackhanWarsRules(game)
  applyAutomaticMoves(rules)
  let moves = 0
  let random = seed + 1
  while (game.rule && moves < MOVES_PER_GAME) {
    rules = new ArackhanWarsRules(game)
    // In the simultaneous phases (choosing a faction, the mulligan) any player still to play will do
    const player = game.players.find(player => rules.isTurnToPlay(player))
    expect(player, `nobody can play on rule ${game.rule.id} (move ${moves})`).toBeDefined()
    const legal = rules.getLegalMoves(player!)
    expect(legal, `no legal move for player ${player} on rule ${game.rule.id} (move ${moves})`).not.toHaveLength(0)
    random = (random * 1103515245 + 12345) % 2147483648
    playAction(rules, legal[random % legal.length] as MaterialMove, player!)
    applyAutomaticMoves(rules)
    moves++
    check(game)
  }
  return { game, moves }
}

/** What must hold between any two moves of any game. */
const check = (game: Game) => {
  const rules = new ArackhanWarsRules(game)
  const cards = rules.material(MaterialType.FactionCard)
  if (cards.length === 0) return // the decks are not created until both players chose
  // The 23 cards of each deck are never lost nor duplicated: they only go from one place to another
  expect(cards.length).toBe(DECK_SIZE * game.players.length)
  for (const item of cards.getItems()) {
    expect([
      LocationType.PlayerDeck, LocationType.PlayerHand, LocationType.PlayerDiscard,
      LocationType.Battlefield, LocationType.AstralPlane, LocationType.UnderCard
    ]).toContain(item.location.type)
  }
  // Two cards never share a space of the battlefield or of the astral plane
  const spaces = cards.location(onBattlefieldAndAstralPlane).getItems().map(item => `${item.location.type}:${item.location.x}:${item.location.y}:${item.location.player ?? ''}`)
  expect(new Set(spaces).size).toBe(spaces.length)
  // The round tracker never goes beyond the last round
  const round = rules.material(MaterialType.RoundTrackerToken).getItem()?.location.x
  if (round !== undefined) expect(round).toBeLessThanOrEqual(NUMBER_OF_ROUNDS)
}

const GAMES = 30

describe('A game played at random', () => {
  for (const deckbuilding of [false, true]) {
    it(`reaches the end of round ${NUMBER_OF_ROUNDS} ${deckbuilding ? 'with the publisher decks' : 'with the faction decks'}`, { timeout: 300_000 }, () => {
      for (let seed = 0; seed < GAMES; seed++) {
        const { game, moves } = playRandomGame(deckbuilding, seed)
        expect(moves, `the game never ended (seed ${seed})`).toBeLessThan(MOVES_PER_GAME)
        expect(game.rule, `the game is still running (seed ${seed})`).toBeUndefined()
        const rules = new ArackhanWarsRules(game)
        expect(rules.round).toBe(NUMBER_OF_ROUNDS)
        for (const player of game.players) {
          expect(rules.getScore(player)).toBeGreaterThanOrEqual(0)
        }
      }
    })
  }
})

describe('The setup', () => {
  it('starts on the choice of a faction, or of a deck with the deckbuilding option', () => {
    expect(newGame(false).rule).toMatchObject({ id: RuleId.ChooseFaction, players: [1, 2] })
    expect(newGame(true).rule).toMatchObject({ id: RuleId.ChooseDeck, players: [1, 2] })
  })
})
