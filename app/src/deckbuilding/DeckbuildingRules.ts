import { FactionCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { FillGapStrategy, isEnumValue, MaterialGameSetup, MaterialRules, PlayerTurnRule } from '@gamepark/rules-api'
import { range } from 'lodash'

export class DeckbuildingRules extends MaterialRules<number, MaterialType, LocationType> {
  locationsStrategies = {
    [MaterialType.FactionCard]: {
      [LocationType.DeckbuildingBook]: new FillGapStrategy()
    }
  }

  rules = {
    [RuleId.DeckBuilding]: DeckbuildingRule
  }
}

class DeckbuildingRule extends PlayerTurnRule<number, MaterialType, LocationType> {
  getPlayerMoves() {
    const bookCards = this.material(MaterialType.FactionCard).location(LocationType.DeckbuildingBook)
    return range(0, 23).flatMap(x => bookCards.moveItems({ type: LocationType.PlayerDeck, x }))
  }
}

export class DeckBuildingSetup extends MaterialGameSetup<number, MaterialType, LocationType> {
  Rules = DeckbuildingRules

  setupMaterial(_options: any) {
    this.material(MaterialType.FactionCard).createItemsAtOnce(
      Object.values(FactionCard).filter(isEnumValue).slice(0, 18).map(card => (
        { id: { front: card }, location: { type: LocationType.DeckbuildingBook } }
      ))
    )
  }

  start() {
    this.startPlayerTurn(RuleId.DeckBuilding, 1)
  }
}