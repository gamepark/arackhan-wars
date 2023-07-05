import { ItemLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { TableLocator } from './TableLocator'
import { PlayerDeckLocator } from './PlayerDeckLocator'
import { PlayerHandLocator } from './PlayerHandLocator'
import { BattlefieldLocator } from './BattlefieldLocator'
import { PlayerTokenStockLocator } from './PlayerTokenStockLocator'
import { RoundTrackerLocator } from './RoundTrackerLocator'
import { PlayerDiscardLocator } from './PlayerDiscardLocator'
import { FactionTokenSpaceLocator } from './FactionTokenSpaceLocator'
import { AstralPlaneLocator } from './AstralPlaneLocator'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { FactionCardLocator } from './FactionCardLocator'

export const Locators: Record<LocationType, ItemLocator<PlayerId, MaterialType, LocationType>> = {
  [LocationType.Table]: new TableLocator(),
  [LocationType.PlayerDeck]: new PlayerDeckLocator(),
  [LocationType.Hand]: new PlayerHandLocator(),
  [LocationType.Battlefield]: new BattlefieldLocator(),
  [LocationType.PlayerTokenStock]: new PlayerTokenStockLocator(),
  [LocationType.RoundTracker]: new RoundTrackerLocator(),
  [LocationType.PlayerDiscard]: new PlayerDiscardLocator(),
  [LocationType.FactionTokenSpace]: new FactionTokenSpaceLocator(),
  [LocationType.FactionCard]: new FactionCardLocator(),
  [LocationType.AstralPlane]: new AstralPlaneLocator()
}
