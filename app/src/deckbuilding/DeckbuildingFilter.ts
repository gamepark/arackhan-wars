import { isEnumValue } from '@gamepark/rules-api'

export enum DeckbuildingFilter {
  Whitelands = 1, Nakka, GreyOrder, Blight, Creature, Land, Spell, Astral
}

export const deckbuildingFilters = Object.values(DeckbuildingFilter).filter(isEnumValue)