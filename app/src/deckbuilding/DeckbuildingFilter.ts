import { isEnumValue } from '@gamepark/rules-api'

export enum DeckbuildingFilter {
  Whitelands = 1, Nakka, GreyOrder, Blight
}

export const deckbuildingFilters = Object.values(DeckbuildingFilter).filter(isEnumValue)