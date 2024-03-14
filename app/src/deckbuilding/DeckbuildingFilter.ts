import { isEnumValue } from '@gamepark/rules-api'

export enum DeckbuildingFilter {
  Faction, CardType, Attribute
}

export enum CardType {
  Creature, Land, Spell, Astral
}

export const cardTypes = Object.values(CardType).filter(isEnumValue)