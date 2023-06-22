import { ItemLocator } from '@gamepark/react-game'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { BattlefieldLocator } from './BattlefieldLocator'
import { PlayerDeckLocator } from './PlayerDeckLocator'
import { PlayerHandLocator } from './PlayerHandLocator'
import { SpaceLocator } from './SpaceLocator'
import { PlayerAreaLocator } from './PlayerAreaLocator'
import { RoundTrackerLocator } from './RoundTrackerLocator'
import { RoundTrackerSpaceLocator } from './RoundTrackerSpaceLocator'
import { PlayerDiscardLocator } from './PlayerDiscardLocator'

export const Locators: Record<LocationType, ItemLocator<Faction, MaterialType, LocationType>> = {
  [LocationType.Battlefield]: new BattlefieldLocator(),
  [LocationType.PlayerDeck]: new PlayerDeckLocator(),
  [LocationType.Hand]: new PlayerHandLocator(),
  [LocationType.Space]: new SpaceLocator(),
  [LocationType.PlayerArea]: new PlayerAreaLocator(),
  [LocationType.RoundTracker]: new RoundTrackerLocator(),
  [LocationType.RoundTrackerSpace]: new RoundTrackerSpaceLocator(),
  [LocationType.PlayerDiscard]: new PlayerDiscardLocator()
}
