import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Locator } from '@gamepark/react-game'
import { AstralPlaneLocator } from './AstralPlaneLocator'
import { AttributesIconsLocator } from './AttributesIconsLocator'
import { battleFieldLocator } from './BattlefieldLocator'
import { CardValueLocator } from './CardValueLocator'
import { CombatIconLocator } from './CombatIconLocator'
import { CombatResultIconLocator } from './CombatResultIconLocator'
import { FactionCardLocator } from './FactionCardLocator'
import { FactionTokenSpaceLocator } from './FactionTokenSpaceLocator'
import { PlayerDeckLocator } from './PlayerDeckLocator'
import { PlayerDiscardLocator } from './PlayerDiscardLocator'
import { PlayerHandLocator } from './PlayerHandLocator'
import { PlayerTokenStockLocator } from './PlayerTokenStockLocator'
import { RoundTrackerLocator } from './RoundTrackerLocator'
import { SkillLostIconLocator } from './SkillLostIconLocator'

export const Locators: Partial<Record<LocationType, Locator>> = {
  [LocationType.Table]: new Locator(),
  [LocationType.RoundTrackerSpot]: new Locator({ coordinates: { x: 50 } }),
  [LocationType.PlayerDeck]: new PlayerDeckLocator(),
  [LocationType.Hand]: new PlayerHandLocator(),
  [LocationType.Battlefield]: battleFieldLocator,
  [LocationType.PlayerTokenStock]: new PlayerTokenStockLocator(),
  [LocationType.RoundTracker]: new RoundTrackerLocator(),
  [LocationType.PlayerDiscard]: new PlayerDiscardLocator(),
  [LocationType.FactionTokenSpace]: new FactionTokenSpaceLocator(),
  [LocationType.FactionCard]: new FactionCardLocator(),
  [LocationType.AstralPlane]: new AstralPlaneLocator(),
  [LocationType.CombatIcon]: new CombatIconLocator(),
  [LocationType.AttributesIcons]: new AttributesIconsLocator(),
  [LocationType.SkillLostIcon]: new SkillLostIconLocator(),
  [LocationType.CombatResultIcon]: new CombatResultIconLocator(),
  [LocationType.CardValue]: new CardValueLocator()
}
