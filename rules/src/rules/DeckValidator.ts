import { listToListing } from '@gamepark/rules-api'
import { sumBy } from 'es-toolkit'
import { AttributeType } from '../material/cards/Attribute'
import { FactionCardCharacteristics } from '../material/cards/FactionCardCharacteristics'
import { DeckListing } from '../material/cards/PreBuildDecks'
import { FactionCard, FactionCardsCharacteristics, getUniqueCard } from '../material/FactionCard'

export class DeckValidator {
  characteristics: FactionCardCharacteristics[]
  listing: DeckListing

  constructor(public deck: FactionCard[]) {
    this.characteristics = deck.map(card => FactionCardsCharacteristics[card])
    this.listing = listToListing(deck.map(getUniqueCard))
  }

  get isValid() {
    return this.is23Cards && this.isSingleFaction && this.isMax125Points && this.isMax5Initiative && this.isMax6Stealth && this.isMaxCardsRespected
  }

  get is23Cards() {
    return this.deck.length === 23
  }

  get isSingleFaction() {
    const faction = this.characteristics[0]?.faction
    return this.characteristics.every(characteristics => characteristics.faction === faction)
  }

  get deckBuildingValue() {
    return sumBy(this.characteristics, characteristics => characteristics.getDeckBuildingValue())
  }

  get isMax125Points() {
    return this.deckBuildingValue <= 125
  }

  countCardsWithAttribute(type: AttributeType) {
    return sumBy(this.characteristics, characteristics => characteristics.getAttributes().some(attribute => attribute.type === type) ? 1 : 0)
  }

  get isMax5Initiative() {
    return this.countCardsWithAttribute(AttributeType.Initiative) <= 5
  }

  get isMax6Stealth() {
    return this.countCardsWithAttribute(AttributeType.Stealth) <= 6
  }

  get cardsOverLimit() {
    return Object.keys(this.listing).map<FactionCard>(Number).filter(card => this.listing[card]! > FactionCardsCharacteristics[card].getLimit())
  }

  get isMaxCardsRespected() {
    return this.cardsOverLimit.length === 0
  }
}