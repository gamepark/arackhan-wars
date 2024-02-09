import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { ItemLocator } from '@gamepark/react-game'
import { FactionCardLocator } from '../locators/FactionCardLocator'
import { BuildingDeckLocator } from './BuildingDeckLocator'
import { DeckbuildingBookLocator } from './DeckbuildingBookLocator'

export const DeckbuildingLocators: Partial<Record<LocationType, ItemLocator>> = {
  [LocationType.DeckbuildingBook]: new DeckbuildingBookLocator(),
  [LocationType.PlayerDeck]: new BuildingDeckLocator(),
  [LocationType.FactionCard]: new FactionCardLocator()
}
