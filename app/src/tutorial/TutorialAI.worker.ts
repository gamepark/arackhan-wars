import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { onBattlefieldAndAstralPlane } from '@gamepark/arackhan-wars/material/Board'
import { isCreature } from '@gamepark/arackhan-wars/material/cards/Creature'
import { PreBuildDecks } from '@gamepark/arackhan-wars/material/cards/PreBuildDecks'
import { isSpell, Spell } from '@gamepark/arackhan-wars/material/cards/Spell'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { Faction } from '@gamepark/arackhan-wars/material/Faction.ts'
import { CardId, FactionCard, FactionCardsCharacteristics } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { getCardRule } from '@gamepark/arackhan-wars/rules/CardRule'
import { NUMBER_OF_ROUNDS } from '@gamepark/arackhan-wars/rules/EndOfRoundRules'
import { PlacementRule } from '@gamepark/arackhan-wars/rules/PlacementRule'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import {
  areAdjacentSquares,
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
import { minBy, partition, sumBy, uniqBy } from 'es-toolkit'
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
        return getActivationNegamax(new ArackhanWarsRules(game), bot).moves
    }
  }
  const legalMoves = new ArackhanWarsRules(game).getLegalMoves(bot)
  return [legalMoves[Math.floor(Math.random() * legalMoves.length)]]
}

type Negamax = {
  moves: MaterialMove[]
  value: number
}

type PlacementTest = {
  moves: MaterialMove[]
  score: number
  rules: ArackhanWarsRules
}

const placementAi = (game: MaterialGame, bot: number) => {
  const rules = new ArackhanWarsRules(game)
  const opponentPlacedCards = rules.material(MaterialType.FactionCard).location(onBattlefieldAndAstralPlane).id<CardId>(id => !id.front).getIndexes()
  const battlefieldSpaces = new PlacementRule(game).battlefieldLegalSpaces
  const cards = rules.material(MaterialType.FactionCard).location(LocationType.PlayerHand).player(bot).getIndexes()
  const [astralCards, battlefieldCards] = partition(cards, card =>
    (FactionCardsCharacteristics[rules.material(MaterialType.FactionCard).getItem(card)!.id.front as FactionCard] as Spell).astral
  )
  const battlefieldUniqCards = uniqBy(battlefieldCards, card => rules.material(MaterialType.FactionCard).getItem(card)!.id.front)
  const isFirstPlayer = !opponentPlacedCards.length
  const placements: PlacementTest[] = []
  // Consider placing one astral card + one battlefield card
  for (const astralCard of astralCards) {
    for (const battlefieldCard of battlefieldUniqCards) {
      for (const space of battlefieldSpaces) {
        const rules = new ArackhanWarsRules(JSON.parse(JSON.stringify(game)))
        const moves: MaterialMove[] = [
          rules.material(MaterialType.FactionCard).index(astralCard)
            .moveItem({ type: LocationType.AstralPlane, x: 0, rotation: true, player: bot }),
          rules.material(MaterialType.FactionCard).index(battlefieldCard)
            .moveItem({ type: LocationType.Battlefield, ...space, rotation: true, player: bot }),
          new PlacementRule(game).validationMove
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
      for (let k = 1; k < battlefieldSpaces.length; k++) {
        for (let l = 0; l < k; l++) {
          const rules = new ArackhanWarsRules(JSON.parse(JSON.stringify(game)))
          const moves = [
            rules.material(MaterialType.FactionCard).index(battlefieldUniqCards[i])
              .moveItem({ type: LocationType.Battlefield, ...battlefieldSpaces[k], rotation: true, player: bot }),
            rules.material(MaterialType.FactionCard).index(battlefieldUniqCards[j])
              .moveItem({ type: LocationType.Battlefield, ...battlefieldSpaces[l], rotation: true, player: bot }),
            new PlacementRule(game).validationMove
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
  placements.sort((p1, p2) => p2.score - p1.score)
  let negamax: Negamax | undefined
  const timeLimit = new Date().getTime() + 5000
  for (const placement of placements) {
    const test = getPlacementNegamax(rules, bot)
    if (!negamax || test.value > negamax.value) {
      negamax = { moves: placement.moves, value: test.value }
    }
    if (new Date().getTime() > timeLimit) break
  }
  return negamax!.moves
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

const getActivationNegamax = (rules: ArackhanWarsRules, bot: number, timeLimit = new Date().getTime() + 10000): Negamax => {
  const round = rules.round
  return getNegamax(rules, bot,
    (rules: ArackhanWarsRules) => rules.round > round,
    (rules: ArackhanWarsRules) => compareScores(rules, bot),
    getActivationMoves, timeLimit
  )
}

const getPlacementNegamax = (rules: ArackhanWarsRules, bot: number, timeLimit = new Date().getTime() + 10000): Negamax => {
  const round = rules.round
  return getNegamax(rules, bot,
    (rules: ArackhanWarsRules) => rules.round > round,
    (rules: ArackhanWarsRules) => compareScores(rules, bot) + comparePotential(rules, bot),
    getActivationMoves, timeLimit
  )
}

const getActivationMoves = (rules: ArackhanWarsRules, player: number): MaterialMove[] => {
  let moves = rules.getLegalMoves(player)
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

const getNegamax = (
  rules: ArackhanWarsRules,
  bot: number,
  stop: (rules: ArackhanWarsRules, depth: number) => boolean,
  score: (rules: ArackhanWarsRules, bot: number) => number,
  getMoves = (rules: ArackhanWarsRules, player: number): MaterialMove[] => rules.getLegalMoves(player),
  timeLimit = 0, depth = 0
): Negamax => {
  const activePlayer = rules.getActivePlayer() ?? rules.players.find(p => rules.isTurnToPlay(p))
  if (!activePlayer || stop(rules, depth)) return { moves: [], value: score(rules, bot) }
  let result: Negamax | undefined = undefined
  const moves = getMoves(rules, activePlayer)
  for (const move of moves) {
    const rulesCopy = new ArackhanWarsRules(JSON.parse(JSON.stringify(rules.game)))
    playAction(rulesCopy, move, bot)
    const test = getNegamax(rulesCopy, bot, stop, score, getMoves, timeLimit, depth + 1)
    if (!result || (activePlayer === bot ? (test.value > result.value) : (test.value < result.value))) {
      result = test
      if (activePlayer === bot) result.moves.unshift(move)
      else result.moves = []
    }
    if (timeLimit && new Date().getTime() > timeLimit) break
  }
  return result ?? { moves: [], value: score(rules, bot) }
}

const compareScores = (rules: ArackhanWarsRules, bot: number) => {
  const opponent = rules.players.find(p => p !== bot)!
  return rules.getScore(bot)! - rules.getScore(opponent)!
}

const comparePotential = (rules: ArackhanWarsRules, bot: number) => {
  return getPotential(rules, bot) - sumBy(rules.players.filter(p => p !== bot), player => getPotential(rules, player))
}

const getPotential = (rules: ArackhanWarsRules, player: number) => {
  const roundsLeft = NUMBER_OF_ROUNDS - rules.round
  const remainingCards = getRemainingCards(rules, player)
  return sumBy(remainingCards.slice(0, roundsLeft * 2), card => FactionCardsCharacteristics[card].getDeckBuildingValue() / 2)
}

const getRemainingCards = (rules: ArackhanWarsRules, player: number): FactionCard[] => {
  const faction = rules.material(MaterialType.FactionCard).location(LocationType.PlayerHand).player(player).getItem()!.id.back as Faction
  const played = rules.material(MaterialType.FactionCard)
    .location(location => location.type === LocationType.Battlefield || location.type === LocationType.PlayerDiscard)
    .getItems().map(item => item.id.front).filter(card => card !== undefined) as FactionCard[]
  const remainingCards = subtract(PreBuildDecks[faction], played)
  return sortBy(remainingCards, card => -FactionCardsCharacteristics[card].getDeckBuildingValue())
}

const subtract = (a: FactionCard[], b: FactionCard[]): FactionCard[] => {
  return [...b.reduce((acc, v) => acc.set(v, (acc.get(v) || 0) - 1),
    a.reduce((acc, v) => acc.set(v, (acc.get(v) || 0) + 1), new Map())
  )].reduce<FactionCard[]>((acc, [v, count]) => count > 0 ? acc.concat(Array(Math.abs(count)).fill(v)) : acc, [])
}
