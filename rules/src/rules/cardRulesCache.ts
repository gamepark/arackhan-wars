import { MaterialGame } from '@gamepark/rules-api'
import type { CardRule } from './CardRule'

type CardRuleFactory = (game: MaterialGame, cardIndex: number) => CardRule

let factory: CardRuleFactory | undefined

export function setCardRuleFactory(f: CardRuleFactory) {
  factory = f
}

let cardsRulesCache: { game: MaterialGame, rules: Record<number, CardRule> } | undefined

export function getCardRule(game: MaterialGame, cardIndex: number): CardRule {
  if (cardsRulesCache?.game !== game) {
    cardsRulesCache = { game, rules: {} }
  }
  if (!cardsRulesCache.rules[cardIndex]) {
    cardsRulesCache.rules[cardIndex] = factory!(game, cardIndex)
  }
  return cardsRulesCache.rules[cardIndex]
}

export function resetCardsRulesCache() {
  cardsRulesCache = undefined
}
