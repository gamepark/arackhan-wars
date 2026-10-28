import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { onBattlefieldAndAstralPlane } from '@gamepark/arackhan-wars/material/Board'
import { isCreature } from '@gamepark/arackhan-wars/material/cards/Creature'
import { PreBuildDecks } from '@gamepark/arackhan-wars/material/cards/PreBuildDecks'
import { isSpell, Spell } from '@gamepark/arackhan-wars/material/cards/Spell'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { Faction } from '@gamepark/arackhan-wars/material/Faction.ts'
import { FactionCardsCharacteristics } from '@gamepark/arackhan-wars/material/cards/FactionCardsCharacteristics'
import { CardId, FactionCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { getCardRule } from '@gamepark/arackhan-wars/rules/CardRule'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { NUMBER_OF_ROUNDS } from '@gamepark/arackhan-wars/rules/EndOfRoundRules'
import { PlacementRule } from '@gamepark/arackhan-wars/rules/PlacementRule'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import {
  areAdjacentSquares,
  CustomMove,
  isCustomMove,
  isCustomMoveType,
  isMoveItem,
  MaterialGame,
  MaterialMove,
  MoveItem,
  MoveKind,
  playAction,
  RuleMoveType,
  XYCoordinates
} from '@gamepark/rules-api'
import { isEqual, minBy, partition, sumBy, uniqBy } from 'es-toolkit'
import { sortBy } from 'es-toolkit/compat'

self.onmessage = (e: MessageEvent<string>) => {
  const data = JSON.parse(e.data) as [MaterialGame, number]
  const result = tutorialAI(...data)
  self.postMessage(JSON.stringify(result))
}

export function tutorialAI(game: MaterialGame, bot: number): MaterialMove[] {
  if (game.tutorial) {
    switch (game.rule?.id) {
      case RuleId.ChooseStartPlayer:
        return [{ kind: MoveKind.CustomMove, type: CustomMoveType.ChoosePlayer, data: bot }]
      case RuleId.Mulligan:
        return [{ kind: MoveKind.RulesMove, type: RuleMoveType.EndPlayerTurn, player: bot }]
      case RuleId.PlacementRule:
        return placementAi(game, bot)
      case RuleId.ActivationRule:
        return getActivationAi(game, bot)
    }
  }
  const legalMoves = new ArackhanWarsRules(game).getLegalMoves(bot)
  return [legalMoves[Math.floor(Math.random() * legalMoves.length)]]
}

const MAX_SPACES_PER_CARD = 3
const PLACEMENT_SEARCH_TIME = 2000
const ACTIVATION_SEARCH_TIME = 2000

type Negamax = {
  moves: MaterialMove[]
  value: number
  complete: boolean // false if the search was cut by the depth limit somewhere
}

type NegamaxSearch = {
  stop: (rules: ArackhanWarsRules) => boolean
  score: (rules: ArackhanWarsRules) => number
  getMoves: (rules: ArackhanWarsRules, player: number) => MaterialMove[]
}

class SearchTimeout extends Error {
}

type PlacementTest = {
  moves: MaterialMove[]
  score: number
  rules: ArackhanWarsRules
}

const placementAi = (game: MaterialGame, bot: number) => {
  const timeLimit = new Date().getTime() + PLACEMENT_SEARCH_TIME
  const rules = new ArackhanWarsRules(game)
  const opponentPlacedCards = rules.material(MaterialType.FactionCard).location(onBattlefieldAndAstralPlane).id<CardId>(id => !id.front).getIndexes()
  const placementRule = new PlacementRule(game)
  const battlefieldSpaces = placementRule.battlefieldLegalSpaces
  const cards = rules.material(MaterialType.FactionCard).location(LocationType.PlayerHand).player(bot)
    .id<CardId>(id => id.front && placementRule.canBePlayed(id.front)).getIndexes()
  const [astralCards, battlefieldCards] = partition(cards, card =>
    (FactionCardsCharacteristics[rules.material(MaterialType.FactionCard).getItem(card)!.id.front as FactionCard] as Spell).astral
  )
  const battlefieldUniqCards = uniqBy(battlefieldCards, card => rules.material(MaterialType.FactionCard).getItem(card)!.id.front)
  const isFirstPlayer = !opponentPlacedCards.length
  // Testing every pair of spaces explodes late in the game: only keep the best spaces for each card evaluated alone
  const bestSpaces = new Map(battlefieldUniqCards.map(card => [card, getBestSpaces(game, card, battlefieldSpaces, isFirstPlayer, bot)]))
  const placements: PlacementTest[] = []
  // Consider placing one astral card + one battlefield card
  for (const astralCard of astralCards) {
    for (const battlefieldCard of battlefieldUniqCards) {
      for (const space of bestSpaces.get(battlefieldCard)!) {
        const rules = new ArackhanWarsRules(JSON.parse(JSON.stringify(game)))
        const moves: MaterialMove[] = [
          rules.material(MaterialType.FactionCard).index(astralCard)
            .moveItem({ type: LocationType.AstralPlane, x: 0, rotation: true, player: bot }),
          rules.material(MaterialType.FactionCard).index(battlefieldCard)
            .moveItem({ type: LocationType.Battlefield, ...space, rotation: true, player: bot }),
          placementRule.validationMove
        ]
        moves.forEach(move => playAction(rules, move, bot))
        placements.push({
          moves, rules, score:
            evaluatePlacement(rules, isFirstPlayer, bot, moves[0]) + evaluatePlacement(rules, isFirstPlayer, bot, moves[1])
        })
      }
    }
  }
  // Consider placing 2 cards on the battlefield
  for (let i = 1; i < battlefieldUniqCards.length; i++) {
    for (let j = 0; j < i; j++) {
      for (const space1 of bestSpaces.get(battlefieldUniqCards[i])!) {
        for (const space2 of bestSpaces.get(battlefieldUniqCards[j])!) {
          if (space1.x === space2.x && space1.y === space2.y) continue
          const rules = new ArackhanWarsRules(JSON.parse(JSON.stringify(game)))
          const moves = [
            rules.material(MaterialType.FactionCard).index(battlefieldUniqCards[i])
              .moveItem({ type: LocationType.Battlefield, ...space1, rotation: true, player: bot }),
            rules.material(MaterialType.FactionCard).index(battlefieldUniqCards[j])
              .moveItem({ type: LocationType.Battlefield, ...space2, rotation: true, player: bot }),
            placementRule.validationMove
          ]
          moves.forEach(move => playAction(rules, move, bot))
          placements.push({
            moves, rules, score:
              evaluatePlacement(rules, isFirstPlayer, bot, moves[0]) + evaluatePlacement(rules, isFirstPlayer, bot, moves[1])
          })
        }
      }
    }
  }
  if (isFirstPlayer) {
    // ignore opponent placement to simplify
    const opponent = rules.players.find(p => p !== bot)!
    for (const placement of placements) {
      for (let i = 0; i < 2; i++) {
        playAction(placement.rules, placement.rules.material(MaterialType.FactionCard).location(LocationType.PlayerHand).player(opponent)
          .moveItem({ type: LocationType.AstralPlane }), bot)
      }
    }
  }
  if (!placements.length) {
    // Less than 2 cards to place: play the legal moves one by one
    return [rules.getLegalMoves(bot)[0]]
  }
  placements.sort((p1, p2) => p2.score - p1.score)
  // Iterative deepening over all the placements: only a depth fully searched for every placement is used to compare them
  const search = getPlacementSearch(rules, bot)
  // The placements are evaluated in heuristic order, so that the most promising ones are evaluated if time runs out
  let results: Negamax[] = []
  for (const placement of placements) {
    if (results.length && new Date().getTime() > timeLimit) break
    results.push(getNegamax(placement.rules, bot, search, 0))
  }
  placements.length = results.length
  for (let depth = 1; results.some(result => !result.complete); depth++) {
    try {
      results = placements.map(placement => getNegamax(placement.rules, bot, search, depth, timeLimit))
    } catch (error) {
      if (error instanceof SearchTimeout) break
      throw error
    }
  }
  // On equal value, the best heuristic score wins (placements are sorted)
  let best = 0
  for (let i = 1; i < placements.length; i++) {
    if (results[i].value > results[best].value) best = i
  }
  return placements[best].moves
}

const getBestSpaces = (game: MaterialGame, card: number, spaces: XYCoordinates[], isFirstPlayer: boolean, bot: number): XYCoordinates[] => {
  if (spaces.length <= MAX_SPACES_PER_CARD) return spaces
  const scores = spaces.map(space => {
    const rules = new ArackhanWarsRules(JSON.parse(JSON.stringify(game)))
    const move = rules.material(MaterialType.FactionCard).index(card).moveItem({ type: LocationType.Battlefield, ...space, rotation: true, player: bot })
    playAction(rules, move, bot)
    // On equal score, prefer the spaces with targets to attack
    return evaluatePlacement(rules, isFirstPlayer, bot, move) + countAdjacentTargets(rules, space, bot) / 10
  })
  return sortBy(spaces.map((space, i) => ({ space, score: scores[i] })), item => -item.score)
    .slice(0, MAX_SPACES_PER_CARD).map(item => item.space)
}

const evaluatePlacement = (rules: ArackhanWarsRules, isFirstPlayer: boolean, bot: number, move: MaterialMove): number => {
  if (!isMoveItem(move) || move.location.type === LocationType.AstralPlane) {
    return 0
  }
  let score = 0
  const space = move.location as XYCoordinates
  const cardIndex = rules.material(MaterialType.FactionCard).location(location =>
    location.type === LocationType.Battlefield && location.x === space.x && location.y === space.y
  ).getIndex()
  const cardRules = getCardRule(rules.game, cardIndex)
  switch (cardRules.card) {
    case FactionCard.AbominableHydra:
      if (!isFirstPlayer) score--
      score += countAdjacentTargets(rules, space, bot) - 1
      break
    case FactionCard.ChildEater:
      if (!isFirstPlayer) score -= 2
      if (hasTargetWithDefenseEqualTo(rules, space, bot, 3)) score += 2
      if (hasTargetWithDefenseEqualTo(rules, space, bot, 2)) score += 1
      score += rules.round - NUMBER_OF_ROUNDS + 1
      break
    case FactionCard.WesternForge:
      if (!isFirstPlayer) score -= 1
      score += countAdjacentAllyCreatures(rules, space, bot) * 2 - 3
      break
    case FactionCard.SwampOgre:
    case FactionCard.ScuttleJaw:
      if (!isFirstPlayer) score--
      if (countAdjacentTargets(rules, space, bot) === 1) score++
      break
    case FactionCard.SwampTroll:
      if (!isFirstPlayer) score--
      score += countAdjacentTargets(rules, space, bot) - 1
      break
    case FactionCard.PlagueCollector:
      score += countAdjacentEnemyCreatures(rules, space, bot)
      score -= countAdjacentAllyCreatures(rules, space, bot)
      break
    case FactionCard.Firestorm:
    case FactionCard.TheFear:
      if (!isFirstPlayer) score++
      score += countAdjacentEnemyCreatures(rules, space, bot) * 2 - 3
      break
    case FactionCard.Slayer:
    case FactionCard.Berserker:
      if (countAdjacentTargets(rules, space, bot) > 1) score++
      break
    case FactionCard.ForgePatriarch:
      score += countAdjacentAllyCreatures(rules, space, bot) - 1
      break
  }
  return score
}

const countAdjacentTargets = (rules: ArackhanWarsRules, space: XYCoordinates, bot: number): number => {
  return rules.material(MaterialType.FactionCard)
    .location(location => location.type === LocationType.Battlefield && areAdjacentSquares(space, location))
    .player(p => p !== bot).id<CardId>(id => id.front && !isSpell(FactionCardsCharacteristics[id.front])).length
}

const countAdjacentEnemyCreatures = (rules: ArackhanWarsRules, space: XYCoordinates, bot: number): number => {
  return rules.material(MaterialType.FactionCard)
    .location(location => location.type === LocationType.Battlefield && areAdjacentSquares(space, location))
    .player(p => p !== bot).id<CardId>(id => id.front && isCreature(FactionCardsCharacteristics[id.front])).length
}

const hasTargetWithDefenseEqualTo = (rules: ArackhanWarsRules, space: XYCoordinates, bot: number, defense: number): boolean => {
  return rules.material(MaterialType.FactionCard)
    .location(location => location.type === LocationType.Battlefield && areAdjacentSquares(space, location))
    .player(p => p !== bot).id<CardId>(id => id.front && !isSpell(FactionCardsCharacteristics[id.front]))
    .getIndexes().some(index => getCardRule(rules.game, index).defense === defense)
}

const countAdjacentAllyCreatures = (rules: ArackhanWarsRules, space: XYCoordinates, bot: number): number => {
  return rules.material(MaterialType.FactionCard)
    .location(location => location.type === LocationType.Battlefield && areAdjacentSquares(space, location))
    .player(bot).id<CardId>(id => id.front && isCreature(FactionCardsCharacteristics[id.front])).length
}

const getActivationAi = (game: MaterialGame, bot: number): MaterialMove[] => {
  const moves = getActivationNegamax(new ArackhanWarsRules(game), bot).moves
  // Every attack must be checked by removeUselessAttacks before it is played: stop before the next attack
  const nextAttack = moves.findIndex((move, index) => index > 0 && isCustomMoveType(CustomMoveType.Attack)(move))
  return nextAttack === -1 ? moves : moves.slice(0, nextAttack)
}

const getActivationNegamax = (rules: ArackhanWarsRules, bot: number, timeLimit = new Date().getTime() + ACTIVATION_SEARCH_TIME): Negamax => {
  const round = rules.round
  // Too expensive to be done during the search: useless attacks are only removed from the moves that will actually be played
  const rootMoves = getActivationMoves(rules, bot, removeUselessAttacks(rules, bot, rules.getLegalMoves(bot)))
  return getIterativeNegamax(rules, bot, {
    stop: (rules: ArackhanWarsRules) => rules.round > round,
    score: (rules: ArackhanWarsRules) => compareScores(rules, bot),
    getMoves: (r: ArackhanWarsRules, player: number) => r === rules ? rootMoves : getActivationMoves(r, player)
  }, timeLimit)
}

/**
 * An attack is useless if it does not improve the score, compared to the same attack without that card
 * (the other cards able to attack the same target are supposed to join the attack).
 */
const removeUselessAttacks = (rules: ArackhanWarsRules, bot: number, moves: MaterialMove[]): MaterialMove[] => {
  const attacks = moves.filter(isCustomMoveType(CustomMoveType.Attack))
  if (!attacks.length) return moves
  const useless = attacks.filter(attack => {
    const helpers = attack.data.target === undefined ? [] : uniqBy(attacks.filter(other =>
      other.data.card !== attack.data.card && other.data.target === attack.data.target
    ), other => other.data.card)
    return simulateAttack(rules, bot, [attack, ...helpers]) <= simulateAttack(rules, bot, helpers)
  })
  const usefulMoves = moves.filter(move => !useless.includes(move as CustomMove))
  return usefulMoves.length ? usefulMoves : moves
}

const simulateAttack = (rules: ArackhanWarsRules, bot: number, attacks: CustomMove[]): number => {
  const copy = new ArackhanWarsRules(JSON.parse(JSON.stringify(rules.game)))
  for (let i = 0; i < attacks.length; i++) {
    // The first attack is legal, but the others might not be able to join it
    if (i > 0 && !copy.getLegalMoves(bot).some(move => isEqual(move, attacks[i]))) continue
    playAction(copy, attacks[i], bot)
  }
  const solveAttack = copy.getLegalMoves(bot).find(isCustomMoveType(CustomMoveType.SolveAttack))
  if (solveAttack) playAction(copy, solveAttack, bot)
  return compareScores(copy, bot)
}

const getPlacementSearch = (rules: ArackhanWarsRules, bot: number): NegamaxSearch => {
  const round = rules.round
  return {
    stop: (rules: ArackhanWarsRules) => rules.round > round,
    score: (rules: ArackhanWarsRules) => compareScores(rules, bot) + comparePotential(rules, bot) + compareKillPotential(rules, bot),
    getMoves: getActivationMoves
  }
}

const getActivationMoves = (rules: ArackhanWarsRules, player: number, moves = rules.getLegalMoves(player)): MaterialMove[] => {
  // If forced exile or teleport is here, start with it
  if (rules.game.rule?.id !== RuleId.ActivationRule) return moves
  if (moves.some(isCustomMoveType(CustomMoveType.PerformAction))) return moves.filter(isCustomMoveType(CustomMoveType.PerformAction))

  const movement = moves.find(move => isMoveItem(move) && move.itemType === MaterialType.FactionCard) as MoveItem | undefined
  if (movement) {
    // Only consider movements & attacks of that unique card first (+ passing)
    return moves.filter(move => !(isCustomMove(move) && move.type === CustomMoveType.Attack && move.data.card !== movement.itemIndex)
      && !(isMoveItem(move) && move.itemType === MaterialType.FactionCard && move.itemIndex !== movement.itemIndex))
  }

  const attacks = moves.filter(isCustomMoveType(CustomMoveType.Attack))
  // never pass when attacking is possible, except with child eater or Initiative cards
  if (attacks.some(move => {
    const cardRule = getCardRule(rules.game, move.data.card)
    return cardRule.card !== FactionCard.ChildEater && !cardRule.hasInitiative
  })) {
    moves = moves.filter(move => !(isCustomMove(move) && move.type === CustomMoveType.Pass))
  }
  // Attack card in ascending order
  if (attacks.length) {
    const firstAttacker = minBy(attacks, attack => attack.data.card)!.data.card
    moves = moves.filter(move => !(isCustomMove(move) && move.type === CustomMoveType.Attack && move.data.card !== firstAttacker))
  }
  return moves
}

/**
 * Iterative deepening: search at depth 1, 2, 3... until the end of the search is reached or the time is over.
 * The result of the deepest fully completed search is kept, so that every root move is always evaluated at the same depth.
 */
const getIterativeNegamax = (rules: ArackhanWarsRules, bot: number, search: NegamaxSearch, timeLimit: number): Negamax => {
  const moves = search.getMoves(rules, bot)
  if (moves.length === 1) return { moves, value: 0, complete: true } // Nothing to think about
  let result = getNegamax(rules, bot, search, 1)
  for (let depth = 2; !result.complete; depth++) {
    try {
      result = getNegamax(rules, bot, search, depth, timeLimit)
    } catch (error) {
      if (error instanceof SearchTimeout) break
      throw error
    }
  }
  return result
}

const getNegamax = (rules: ArackhanWarsRules, bot: number, search: NegamaxSearch, depth: number, timeLimit = Infinity): Negamax => {
  if (new Date().getTime() > timeLimit) throw new SearchTimeout()
  const activePlayer = rules.getActivePlayer() ?? rules.players.find(p => rules.isTurnToPlay(p))
  if (!activePlayer || search.stop(rules)) return { moves: [], value: search.score(rules), complete: true }
  if (depth <= 0) return { moves: [], value: search.score(rules), complete: false }
  let result: Negamax | undefined = undefined
  let complete = true
  for (const move of search.getMoves(rules, activePlayer)) {
    const rulesCopy = new ArackhanWarsRules(JSON.parse(JSON.stringify(rules.game)))
    playAction(rulesCopy, move, bot)
    const test = getNegamax(rulesCopy, bot, search, depth - 1, timeLimit)
    complete &&= test.complete
    if (!result || (activePlayer === bot ? (test.value > result.value) : (test.value < result.value))) {
      result = test
      if (activePlayer === bot) result.moves.unshift(move)
      else result.moves = []
    }
  }
  return result ? { ...result, complete } : { moves: [], value: search.score(rules), complete }
}

/**
 * Estimates the fights to come: the value of the cards each player can expect to destroy.
 * The player who acts first has the full benefit; the other one acts with the cards that survived, so it only counts half.
 */
const compareKillPotential = (rules: ArackhanWarsRules, bot: number) => {
  const opponent = rules.players.find(p => p !== bot)!
  // During the initiative sequence, the normal sequence that follows still starts with the start player
  const firstPlayer = (!rules.remind(Memory.IsInitiativeSequence) && rules.getActivePlayer()) || rules.remind(Memory.StartPlayer)
  const weight = (player: number) => player === firstPlayer ? 1 : 0.5
  return getKillPotential(rules, bot) * weight(bot) - getKillPotential(rules, opponent) * weight(opponent)
}

/**
 * Greedy estimation: the most valuable enemy cards are attacked first, by the strongest attackers available, until destroyed.
 */
const getKillPotential = (rules: ArackhanWarsRules, player: number): number => {
  const cards = rules.material(MaterialType.FactionCard)
  let attackers = cards.location(onBattlefieldAndAstralPlane).player(player).getIndexes().filter(index => {
    const cardRule = getCardRule(rules.game, index)
    return cardRule.isActive && cardRule.characteristics?.canAttack
  })
  if (!attackers.length) return 0
  const targets = sortBy(cards.location(LocationType.Battlefield).player(p => p !== player).getIndexes()
    .map(index => getCardRule(rules.game, index))
    .filter(target => target.canBeAttacked && target.score > 0), target => -target.score)
  let kills = 0
  for (const target of targets) {
    const candidates = sortBy(attackers.filter(attacker => getCardRule(rules.game, attacker).canAttackTarget(target.index)),
      attacker => -getCardRule(rules.game, attacker).getAttack(target.index))
    const group: number[] = []
    for (const candidate of candidates) {
      group.push(candidate)
      if ((target.getDamagesInflicted(group) ?? 0) > target.getDefense(group)) {
        kills += target.score
        attackers = attackers.filter(attacker => !group.includes(attacker))
        break
      }
    }
  }
  return kills
}

const compareScores = (rules: ArackhanWarsRules, bot: number) => {
  const opponent = rules.players.find(p => p !== bot)!
  return rules.getScore(bot)! - rules.getScore(opponent)!
}

const comparePotential = (rules: ArackhanWarsRules, bot: number) => {
  return getPotential(rules, bot) - sumBy(rules.players.filter(p => p !== bot), player => getPotential(rules, player))
}

/**
 * The cards that will still score: the most valuable creatures & lands remaining, within the placements left.
 * Spells are excluded: they do not score, and a spell kept in hand is worth nothing at the end of the game.
 * Therefore, playing a spell costs the creature that will never be placed for lack of room (nothing if there is room enough).
 */
const getPotential = (rules: ArackhanWarsRules, player: number) => {
  const roundsLeft = NUMBER_OF_ROUNDS - rules.round
  if (roundsLeft <= 0) return 0
  const values = getRemainingCards(rules, player)
    .map(card => FactionCardsCharacteristics[card])
    .filter(characteristics => !isSpell(characteristics))
    .map(characteristics => characteristics.value)
  return sumBy(sortBy(values, value => -value).slice(0, roundsLeft * 2), value => value)
}

const getRemainingCards = (rules: ArackhanWarsRules, player: number): FactionCard[] => {
  const cards = rules.material(MaterialType.FactionCard)
  const faction = (cards.location(LocationType.PlayerHand).player(player).getItem() ?? cards.player(player).getItem())!.id.back as Faction
  const played = cards
    .location(location => location.type === LocationType.Battlefield || location.type === LocationType.PlayerDiscard)
    .id<CardId>(id => id.back === faction && id.front !== undefined)
    .getItems().map(item => item.id.front as FactionCard)
  return subtract(PreBuildDecks[faction], played)
}

const subtract = (a: FactionCard[], b: FactionCard[]): FactionCard[] => {
  return [...b.reduce((acc, v) => acc.set(v, (acc.get(v) || 0) - 1),
    a.reduce((acc, v) => acc.set(v, (acc.get(v) || 0) + 1), new Map())
  )].reduce<FactionCard[]>((acc, [v, count]) => count > 0 ? acc.concat(Array(Math.abs(count)).fill(v)) : acc, [])
}
