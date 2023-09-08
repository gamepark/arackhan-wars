import {
  isCustomMove,
  isCustomMoveType,
  isMoveItemLocation,
  Location,
  MaterialGame,
  MaterialMove,
  MaterialRules,
  MaterialRulesCreator,
  MoveKind,
  playMove,
  RuleMoveType
} from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { minBy, sortBy, sumBy, uniq } from 'lodash'
import { PreBuildDecks } from '@gamepark/arackhan-wars/material/cards/PreBuildDecks'
import { FactionCard, FactionCardsCharacteristics } from '@gamepark/arackhan-wars/material/FactionCard'
import { NUMBER_OF_ROUNDS } from '@gamepark/arackhan-wars/rules/EndPhaseRules'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { onBattlefieldAndAstralPlane } from '@gamepark/arackhan-wars/material/Board'
import { getCardRule } from '@gamepark/arackhan-wars/rules/CardRule'

export async function tutorialAI(game: MaterialGame, bot: number): Promise<MaterialMove[]> {
  switch (game.rule?.id) {
    case RuleId.ChooseStartPlayer:
      return Promise.resolve([{ kind: MoveKind.CustomMove, type: CustomMoveType.ChoosePlayer, data: bot }])
    case RuleId.Mulligan:
      return Promise.resolve([{ kind: MoveKind.RulesMove, type: RuleMoveType.EndPlayerTurn, player: bot }])
    case RuleId.PlacementRule:
      return Promise.resolve(placementAi(game, bot))
    default:
      return Promise.resolve(getArackhanWarsNegamax(new ArackhanWarsRules(game), bot).moves)
  }
}

type Negamax = {
  moves: MaterialMove[]
  value: number
}

const placementAi = (game: MaterialGame, bot: number) => {
  const rules = new ArackhanWarsRules(JSON.parse(JSON.stringify(game)))
  const opponent = rules.players.find(p => p !== bot)!
  const placedCards = rules.material(MaterialType.FactionCard).location(onBattlefieldAndAstralPlane).getItems().filter(item => !item.id.front)
  const opponentRemainingCards = getRemainingCards(rules, opponent)
  if (placedCards.length === 2) {
    // Hypothesis on what the opponent placed
    const timeLimit = new Date().getTime() + 10000
    let result: Negamax = { moves: [], value: Infinity }
    const remainingPotential = uniq(opponentRemainingCards) // ignore placing same card twice
    for (let i = 1; i < remainingPotential.length; i++) {
      for (let j = 0; j < i; j++) {
        placedCards[0].id.front = remainingPotential[i]
        placedCards[1].id.front = remainingPotential[j]
        const test1 = getArackhanWarsNegamax(rules, bot, timeLimit)
        if (test1.value < result.value) result = test1
        placedCards[0].id.front = remainingPotential[j]
        placedCards[1].id.front = remainingPotential[i]
        const test2 = getArackhanWarsNegamax(rules, bot, timeLimit)
        if (test2.value < result.value) result = test2
      }
    }
    return result.moves
  } else {
    // Hypothesis on what the opponent has in their hand (the best cards)
    const cards = rules.material(MaterialType.FactionCard).location(LocationType.Hand).player(opponent).getItems().filter(item => !item.id.front)
    for (let i = 0; i < cards.length; i++) {
      cards[i].id.front = opponentRemainingCards[i]
    }
    return getArackhanWarsNegamax(rules, bot).moves
  }
}

const getArackhanWarsNegamax = (rules: ArackhanWarsRules, bot: number, timeLimit = new Date().getTime() + 10000): Negamax => {
  const round = rules.round
  const placement = rules.game.rule?.id === RuleId.PlacementRule
  return getNegamax(rules, bot,
    (rules: ArackhanWarsRules) => rules.round > round,
    (rules: ArackhanWarsRules) => compareScores(rules, bot) + (placement ? comparePotential(rules, bot) : 0),
    prune, timeLimit
  )
}

const prune = (moves: MaterialMove[], rules: ArackhanWarsRules): MaterialMove[] => {
  switch (rules.game.rule?.id) {
    case RuleId.ActivationRule:
      return pruneActivationMoves(moves, rules)
    case RuleId.PlacementRule:
      return prunePlacementMoves(moves, rules)
    default:
      return moves
  }
}

const pruneActivationMoves = (moves: MaterialMove[], rules: ArackhanWarsRules): MaterialMove[] => {
  // If forced exile is here, start with it
  if (moves.some(isCustomMoveType(CustomMoveType.PerformAction))) return moves.filter(isCustomMoveType(CustomMoveType.PerformAction))

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

const prunePlacementMoves = (moves: MaterialMove[], rules: ArackhanWarsRules): MaterialMove[] => {
  const placedCard = rules.material(MaterialType.FactionCard).location(LocationType.Battlefield).player(rules.getActivePlayer()!).getItem()
  if (placedCard) {
    moves = moves.filter(move =>
      !(isMoveItemLocation(move) && move.position.location.type === LocationType.AstralPlane)
      && !(isMoveItemLocation(move) && move.position.location.type === LocationType.Battlefield && isLocatedBefore(move.position.location, placedCard.location))
    )
  } else {
    moves = moves.filter(move => !(isMoveItemLocation(move) && move.position.location.type === LocationType.AstralPlane && move.position.location.x === 1))
  }
  return moves
}

const isLocatedBefore = (location1: Location, location2: Location) => {
  return location1.x! < location2.x! || (location1.x === location2.x && location1.y! < location2.y!)
}

const getNegamax = <Rules extends MaterialRules>(
  rules: Rules,
  bot: number,
  stop: (rules: Rules, depth: number) => boolean,
  score: (rules: Rules, bot: number) => number,
  prune = (moves: MaterialMove[], _rules: Rules): MaterialMove[] => moves,
  timeLimit = 0, depth = 0
): Negamax => {
  const activePlayer = rules.getActivePlayer() ?? rules.players.find(p => rules.isTurnToPlay(p))
  if (!activePlayer || stop(rules, depth)) return { moves: [], value: score(rules, bot) }
  let result: Negamax | undefined = undefined
  const legalMoves = prune(rules.getLegalMoves(activePlayer), rules)
  for (const move of legalMoves) {
    const Rules = rules.constructor as MaterialRulesCreator
    const rulesCopy = new Rules(JSON.parse(JSON.stringify(rules.game))) as Rules
    playMove(rulesCopy, move)
    const test = getNegamax(rulesCopy, bot, stop, score, prune, timeLimit, depth + 1)
    if (!result || (activePlayer === bot ? (test.value > result.value) : (test.value < result.value))) {
      result = test
      if (activePlayer === bot) result.moves.unshift(move)
      else result.moves = []
    }
    if (timeLimit && new Date().getTime() > timeLimit) return result
  }
  return result ?? { moves: [], value: score(rules, bot) }
}

const compareScores = (rules: ArackhanWarsRules, bot: number) => {
  return rules.getScore(bot)! - sumBy(rules.players.filter(p => p !== bot), player => rules.getScore(player)!)
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
  const faction = rules.material(MaterialType.FactionCard).location(LocationType.Hand).player(player).getItem()!.id.back
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
