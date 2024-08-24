import { AttributeType } from '@gamepark/arackhan-wars/material/cards/Attribute'
import { isCreature } from '@gamepark/arackhan-wars/material/cards/Creature'
import { FactionCardCharacteristics } from '@gamepark/arackhan-wars/material/cards/FactionCardCharacteristics'
import { isLand } from '@gamepark/arackhan-wars/material/cards/Land'
import { isSpell } from '@gamepark/arackhan-wars/material/cards/Spell'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { FactionCard, FactionCardsCharacteristics } from '@gamepark/arackhan-wars/material/FactionCard'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import {
  CustomMove,
  FillGapStrategy,
  getEnumValues,
  isMoveItemType,
  ItemMove,
  LocalMovePreview,
  Location,
  MaterialGameSetup,
  MaterialMove,
  MaterialRules,
  PlayerTurnRule
} from '@gamepark/rules-api'
import range from 'lodash/range'
import { CardType, DeckbuildingFilter } from './DeckbuildingFilter'

const Page = 100
const Name = 101
const PageSize = 18
const DeckSize = 23

export enum DeckbuildingMove {
  ChangeFilter = 1, ChangePage, Rename
}

export class DeckbuildingRules extends MaterialRules<number, MaterialType, LocationType>
  implements LocalMovePreview<MaterialMove<number, MaterialType, LocationType>> {

  locationsStrategies = {
    [MaterialType.FactionCard]: {
      [LocationType.DeckbuildingBook]: new FillGapStrategy()
    }
  }

  rules = {
    [RuleId.Deckbuilding]: DeckbuildingRule
  }

  itemsCanMerge() {
    return false
  }

  previewMove() {
    return true
  }

  changeFilter(filter: DeckbuildingFilter, value?: Faction | CardType | AttributeType) {
    return new DeckbuildingRule(this.game).rules().customMove(DeckbuildingMove.ChangeFilter, { filter, value })
  }

  changePage(page: number) {
    return new DeckbuildingRule(this.game).rules().customMove(DeckbuildingMove.ChangePage, page)
  }

  get name() {
    return this.remind(Name)
  }

  rename(name: string) {
    return new DeckbuildingRule(this.game).rules().customMove(DeckbuildingMove.Rename, name)
  }

  get page() {
    return new DeckbuildingRule(this.game).page
  }

  get maxPage() {
    return new DeckbuildingRule(this.game).maxPage
  }
}

class DeckbuildingRule extends PlayerTurnRule<number, MaterialType, LocationType> {

  isLegalMove() {
    return true
  }

  getPlayerMoves() {
    const bookCards = this.material(MaterialType.FactionCard).location(LocationType.DeckbuildingBook)
    const deckCards = this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck)
    return [
      ...range(0, DeckSize).flatMap(x => bookCards.moveItems({ type: LocationType.PlayerDeck, x })),
      ...range(0, DeckSize).flatMap(x => {
        const cardAtX = deckCards.location(l => l.x === x)
        if (!cardAtX.length) return []
        return range(0, DeckSize).filter(i => i !== x).map(x => cardAtX.moveItem({ type: LocationType.PlayerDeck, x }))
      }),
      ...deckCards.deleteItems()
    ]
  }

  get page() {
    return this.remind(Page) ?? 1
  }

  get maxPage() {
    return Math.floor(new DeckbuildingRule(this.game).cards.length / PageSize) + 1
  }

  beforeItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (!isMoveItemType(MaterialType.FactionCard)(move)) return []
    const movedCard = this.material(MaterialType.FactionCard).getItem(move.itemIndex)
    const replacedCard = this.material(MaterialType.FactionCard).location(LocationType.PlayerDeck).location(l => l.x === move.location.x)
    if (movedCard?.location.type === LocationType.DeckbuildingBook) {
      moves.push(this.material(MaterialType.FactionCard).createItem(movedCard))
      if (replacedCard.length) {
        moves.push(replacedCard.deleteItem())
      }
    } else if (replacedCard.length) {
      moves.push(replacedCard.moveItem({ type: LocationType.PlayerDeck, x: movedCard?.location.x }))
    }
    return moves
  }

  onCustomMove(move: CustomMove) {
    switch (move.type) {
      case DeckbuildingMove.ChangeFilter:
        return this.onChangeFilter(move.data.filter, move.data.value)
      case DeckbuildingMove.ChangePage:
        this.memorize<number>(Page, move.data)
        return this.displayNewPage()
      case DeckbuildingMove.Rename:
        this.memorize(Name, move.data)
        return []
    }
    return []
  }

  onChangeFilter(filter: DeckbuildingFilter, value: Faction | CardType | AttributeType) {
    this.memorize(filter, value)
    this.memorize<number>(Page, 1)
    return this.displayNewPage()
  }

  displayNewPage() {
    const page = this.page
    return [
      this.material(MaterialType.FactionCard).createItemsAtOnce(this.cards.slice((page - 1) * PageSize, page * PageSize).map((card, x) =>
        cardToItem(card, { type: LocationType.DeckbuildingBook, x })
      )),
      this.material(MaterialType.FactionCard).location(LocationType.DeckbuildingBook).deleteItemsAtOnce()
    ]
  }

  get cards() {
    return allCards.filter(card => this.filterCard(card))
  }

  filterCard(card: FactionCard) {
    const characteristics = FactionCardsCharacteristics[card]
    return this.factionFilter(characteristics)
      && this.typeFilter(characteristics)
      && this.attributesFilter(characteristics)
  }

  factionFilter(characteristics: FactionCardCharacteristics) {
    const faction = this.remind<Faction | undefined>(DeckbuildingFilter.Faction)
    return typeof faction !== 'number' || faction === characteristics.faction
  }

  typeFilter(characteristics: FactionCardCharacteristics) {
    const cardType = this.remind<CardType | undefined>(DeckbuildingFilter.CardType)
    switch (cardType) {
      case CardType.Creature:
        return isCreature(characteristics)
      case CardType.Land:
        return isLand(characteristics)
      case CardType.Spell:
        return isSpell(characteristics)
      case CardType.Astral:
        return isSpell(characteristics) && characteristics.astral
      default:
        return true
    }
  }

  attributesFilter(characteristics: FactionCardCharacteristics) {
    const attributeType = this.remind<AttributeType | undefined>(DeckbuildingFilter.Attribute)
    return typeof attributeType !== 'number' || characteristics.getAttributes().some(attribute => attribute.type === attributeType)
  }
}

export class DeckBuildingSetup extends MaterialGameSetup<number, MaterialType, LocationType> {
  Rules = DeckbuildingRules

  setupMaterial(_options: any) {
    this.material(MaterialType.FactionCard).createItemsAtOnce(allCards.slice(0, 18).map(card =>
      cardToItem(card, { type: LocationType.DeckbuildingBook })
    ))
  }

  start() {
    this.startPlayerTurn(RuleId.Deckbuilding, 1)
  }
}

const allCards = getEnumValues(FactionCard)

export const cardToItem = (card: FactionCard, location: Location) => ({ id: { front: card, back: FactionCardsCharacteristics[card].faction }, location })
