// CardRule registers itself as the card rule factory (side effect at the end of CardRule.ts).
// It is re-exported as a value, and not merely imported for its side effect, so that bundlers
// cannot tree-shake the module away when the package is flagged as side-effect free.
export { CardRule } from './rules/CardRule'

export { ArackhanWarsRules } from './ArackhanWarsRules'
export { ArackhanWarsOptionsSpecV2 } from './ArackhanWarsOptions'
export { ArackhanWarsSetup } from './ArackhanWarsSetup'
