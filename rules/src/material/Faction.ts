import { isEnumValue } from '@gamepark/rules-api'

export enum Faction {
  Whitelands = 1, Nakka, GreyOrder, Blight
}

export const factions = Object.values(Faction).filter(isEnumValue)
