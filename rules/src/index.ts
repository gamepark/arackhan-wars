import { setCardRuleFactory } from './rules/cardRulesCache'
import { CardRule } from './rules/CardRule'

setCardRuleFactory((game, cardIndex) => new CardRule(game, cardIndex))

export { ArackhanWarsRules } from './ArackhanWarsRules'
export { ArackhanWarsOptionsSpec } from './ArackhanWarsOptions'
export { ArackhanWarsSetup } from './ArackhanWarsSetup'
