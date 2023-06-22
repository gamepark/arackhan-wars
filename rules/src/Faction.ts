import { isEnumValue } from '@gamepark/rules-api'

export enum Faction {
  Whitelands = 1, Nakka, GrayOrder, Blight
}

export const playerFactions = Object.values(Faction).filter(isEnumValue)
