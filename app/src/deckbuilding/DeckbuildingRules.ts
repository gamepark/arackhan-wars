import { FactionCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { isEnumValue, MaterialGameSetup, MaterialRules, PlayerTurnRule } from '@gamepark/rules-api'

export class DeckbuildingRules extends MaterialRules<number, MaterialType, LocationType> {
  rules = {
    [RuleId.DeckBuilding]: DeckbuildingRule
  }

  get displayedCards() {
    return Object.values(FactionCard).filter(isEnumValue).slice(0, 18)
  }
}

class DeckbuildingRule extends PlayerTurnRule<number, MaterialType, LocationType> {

}

export class DeckBuildingSetup extends MaterialGameSetup<number, MaterialType, LocationType> {
  Rules = DeckbuildingRules

  start() {
    this.startPlayerTurn(RuleId.DeckBuilding, 1)
  }
}