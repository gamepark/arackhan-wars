import { MaterialGameSetup } from '@gamepark/rules-api'
import { ArackhanWarsOptions } from './ArackhanWarsOptions'
import { ArackhanWarsRules } from './ArackhanWarsRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ArackhanWarsSetup extends MaterialGameSetup<number, MaterialType, LocationType, ArackhanWarsOptions> {
  Rules = ArackhanWarsRules

  start(options: ArackhanWarsOptions) {
    this.startSimultaneousRule(options.deckbuilding ? RuleId.ChooseDeck : RuleId.ChooseFaction)
  }
}
