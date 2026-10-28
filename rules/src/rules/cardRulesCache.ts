import { MaterialGame } from '@gamepark/rules-api'
import type { CardRule } from './CardRule'

type CardRuleFactory = (game: MaterialGame, cardIndex: number) => CardRule

let factory: CardRuleFactory | undefined

export function setCardRuleFactory(f: CardRuleFactory) {
  factory = f
}

// One cache per game: rules evaluated on a copy of the game (e.g. to test a movement) must not evict the cache of the original game
let cardsRulesCache = new WeakMap<MaterialGame, Record<number, CardRule>>()

export function getCardRule(game: MaterialGame, cardIndex: number): CardRule {
  let rules = cardsRulesCache.get(game)
  if (!rules) {
    rules = {}
    cardsRulesCache.set(game, rules)
  }
  if (!rules[cardIndex]) {
    rules[cardIndex] = factory!(game, cardIndex)
  }
  return rules[cardIndex]
}

export function resetCardsRulesCache() {
  cardsRulesCache = new WeakMap()
}
