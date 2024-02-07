import { isCreature } from '@gamepark/arackhan-wars/material/cards/Creature'
import { FactionCardCharacteristics } from '@gamepark/arackhan-wars/material/cards/FactionCardCharacteristics'
import { isLand } from '@gamepark/arackhan-wars/material/cards/Land'
import { isSpell } from '@gamepark/arackhan-wars/material/cards/Spell'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { FactionCard, FactionCardsCharacteristics } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { CustomMove, FillGapStrategy, isEnumValue, isMoveItemType, ItemMove, MaterialGameSetup, MaterialRules, PlayerTurnRule } from '@gamepark/rules-api'
import difference from 'lodash/difference'
import range from 'lodash/range'
import { DeckbuildingFilter, deckbuildingFilters } from './DeckbuildingFilter'

const Page = 100
const PageSize = 18
const DeckSize = 23

export enum DeckbuildingMove {
  ChangeFilter = 1, ChangePage
}

export class DeckbuildingRules extends MaterialRules<number, MaterialType, LocationType> {

  static local = true

  locationsStrategies = {
    [MaterialType.FactionCard]: {
      [LocationType.DeckbuildingBook]: new FillGapStrategy()
    }
  }

  rules = {
    [RuleId.DeckBuilding]: DeckbuildingRule
  }

  changeFilter(filter: DeckbuildingFilter) {
    return new DeckbuildingRule(this.game).rules().customMove(DeckbuildingMove.ChangeFilter, filter)
  }

  changePage(page: number) {
    return new DeckbuildingRule(this.game).rules().customMove(DeckbuildingMove.ChangePage, page)
  }

  get page() {
    return new DeckbuildingRule(this.game).page
  }

  get maxPage() {
    return new DeckbuildingRule(this.game).maxPage
  }
}

class DeckbuildingRule extends PlayerTurnRule<number, MaterialType, LocationType> {
  getPlayerMoves() {
    const bookCards = this.material(MaterialType.FactionCard).location(LocationType.DeckbuildingBook)
    const deckX = this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).getItems().map(i => i.location.x!)
    return [
      ...difference(range(0, DeckSize), deckX).flatMap(x => bookCards.moveItems({ type: LocationType.PlayerDeck, x })),
      ...deckbuildingFilters.map(filter => this.rules().customMove(DeckbuildingMove.ChangeFilter, filter)),
      ...difference(range(1, this.maxPage + 1), [this.page]).map(page => this.rules().customMove(DeckbuildingMove.ChangePage, page))
    ]
  }

  get page() {
    return this.remind(Page) ?? 1
  }

  get maxPage() {
    return Math.floor(new DeckbuildingRule(this.game).cards.length / PageSize) + 1
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
    if (move.type === DeckbuildingMove.ChangeFilter) {
      this.memorize<boolean>(move.data, value => !value)
      this.memorize<number>(Page, 1)
    } else if (move.type === DeckbuildingMove.ChangePage) {
      this.memorize<number>(Page, move.data)
    }
    const page = this.page
    return [
      this.material(MaterialType.FactionCard).location(LocationType.DeckbuildingBook).deleteItemsAtOnce(),
      this.material(MaterialType.FactionCard).createItemsAtOnce(this.cards.slice((page - 1) * PageSize, page * PageSize).map(card => (
        { id: { front: card }, location: { type: LocationType.DeckbuildingBook } }
      )))
    ]
  }

  get cards() {
    return allCards.filter(card => this.filterCard(card))
  }

  filterCard(card: FactionCard) {
    const characteristics = FactionCardsCharacteristics[card]
    return this.factionFilter(characteristics.faction)
      && this.typeFilter(characteristics)
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

  typeFilter(characteristics: FactionCardCharacteristics) {
    const creature = this.remind(DeckbuildingFilter.Creature)
    const land = this.remind(DeckbuildingFilter.Land)
    const spell = this.remind(DeckbuildingFilter.Spell)
    if (!creature && !land && !spell) return true
    if (!creature && isCreature(characteristics)) return false
    if (!land && isLand(characteristics)) return false
    return !(!spell && isSpell(characteristics))
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