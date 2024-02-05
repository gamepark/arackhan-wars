import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { FactionCard, FactionCardsCharacteristics } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { CustomMove, FillGapStrategy, isEnumValue, isMoveItemType, ItemMove, MaterialGameSetup, MaterialRules, PlayerTurnRule } from '@gamepark/rules-api'
import difference from 'lodash/difference'
import range from 'lodash/range'
import { DeckbuildingFilter, deckbuildingFilters } from './DeckbuildingFilter'

const ChangeFilter = 1

export class DeckbuildingRules extends MaterialRules<number, MaterialType, LocationType> {
  locationsStrategies = {
    [MaterialType.FactionCard]: {
      [LocationType.DeckbuildingBook]: new FillGapStrategy()
    }
  }

  rules = {
    [RuleId.DeckBuilding]: DeckbuildingRule
  }

  changeFilter(filter: DeckbuildingFilter) {
    return new DeckbuildingRule(this.game).rules().customMove(ChangeFilter, filter)
  }
}

class DeckbuildingRule extends PlayerTurnRule<number, MaterialType, LocationType> {
  getPlayerMoves() {
    const bookCards = this.material(MaterialType.FactionCard).location(LocationType.DeckbuildingBook)
    const deckX = this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).getItems().map(i => i.location.x!)
    return [
      ...difference(range(0, 23), deckX).flatMap(x => bookCards.moveItems({ type: LocationType.PlayerDeck, x })),
      ...deckbuildingFilters.map(filter => this.rules().customMove(ChangeFilter, filter))
    ]
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.FactionCard)(move)) return []
    const movedCard = this.material(MaterialType.FactionCard).getItem(move.itemIndex)
    if (movedCard?.location.type === LocationType.DeckbuildingBook) {
      return [this.material(MaterialType.FactionCard).createItem(movedCard)]
    }
    return []
  }

  onCustomMove(move: CustomMove) {
    if (move.type === ChangeFilter) {
      this.memorize(move.data, value => !value)
      return [
        this.material(MaterialType.FactionCard).location(LocationType.DeckbuildingBook).deleteItemsAtOnce(),
        this.material(MaterialType.FactionCard).createItemsAtOnce(allCards.filter(card => this.filterCard(card)).slice(0, 18).map(card => (
          { id: { front: card }, location: { type: LocationType.DeckbuildingBook } }
        )))
      ]
    }
    return []
  }

  filterCard(card: FactionCard) {
    const characteristics = FactionCardsCharacteristics[card]
    return this.factionFilter(characteristics.faction)
  }

  factionFilter(faction: Faction) {
    const whitelands = this.remind(DeckbuildingFilter.Whitelands)
    const nakka = this.remind(DeckbuildingFilter.Nakka)
    const greyOrder = this.remind(DeckbuildingFilter.GreyOrder)
    const blight = this.remind(DeckbuildingFilter.Blight)
    if (!whitelands && !nakka && !greyOrder && !blight) return true
    switch (faction) {
      case Faction.Whitelands:
        return whitelands
      case Faction.Nakka:
        return nakka
      case Faction.GreyOrder:
        return greyOrder
      case Faction.Blight:
        return blight
    }
  }
}

export class DeckBuildingSetup extends MaterialGameSetup<number, MaterialType, LocationType> {
  Rules = DeckbuildingRules

  setupMaterial(_options: any) {
    this.material(MaterialType.FactionCard).createItemsAtOnce(
      allCards.slice(0, 18).map(card => (
        { id: { front: card }, location: { type: LocationType.DeckbuildingBook } }
      ))
    )
  }

  start() {
    this.startPlayerTurn(RuleId.DeckBuilding, 1)
  }
}

const allCards = Object.values(FactionCard).filter(isEnumValue)