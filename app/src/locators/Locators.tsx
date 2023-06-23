import { ItemLocator } from '@gamepark/react-game'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { TableLocator } from './TableLocator'
import { PlayerDeckLocator } from './PlayerDeckLocator'
import { PlayerHandLocator } from './PlayerHandLocator'
import { BattlefieldLocator } from './BattlefieldLocator'
import { PlayerTokenStockLocator } from './PlayerTokenStockLocator'
import { RoundTrackerLocator } from './RoundTrackerLocator'
import { PlayerDiscardLocator } from './PlayerDiscardLocator'
import { FactionCardLocator } from './FactionCardLocator'
import { AstralPlaneLocator } from './AstralPlaneLocator'

export const Locators: Record<LocationType, ItemLocator<Faction, MaterialType, LocationType>> = {
  [LocationType.Table]: new TableLocator(),
  [LocationType.PlayerDeck]: new PlayerDeckLocator(),
  [LocationType.Hand]: new PlayerHandLocator(),
  [LocationType.Battlefield]: new BattlefieldLocator(),
  [LocationType.PlayerTokenStock]: new PlayerTokenStockLocator(),
  [LocationType.RoundTracker]: new RoundTrackerLocator(),
  [LocationType.PlayerDiscard]: new PlayerDiscardLocator(),
  [LocationType.FactionCard]: new FactionCardLocator(),
  [LocationType.AstralPlane]: new AstralPlaneLocator()
}
