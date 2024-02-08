import { isEnumValue } from '@gamepark/rules-api'

export enum DeckbuildingFilter {
  Whitelands = 1, Nakka, GreyOrder, Blight, Creature, Land, Spell, Astral,
  Initiative = 11, Movement, Flight, Omnistrike, RangedAttack, Swarm, Regeneration, Stealth, Perforation
}

export const deckbuildingFilters = Object.values(DeckbuildingFilter).filter(isEnumValue)