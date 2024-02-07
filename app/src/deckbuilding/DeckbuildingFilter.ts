import { isEnumValue } from '@gamepark/rules-api'

export enum DeckbuildingFilter {
  Whitelands = 1, Nakka, GreyOrder, Blight, Creature, Land, Spell
}

export const deckbuildingFilters = Object.values(DeckbuildingFilter).filter(isEnumValue)