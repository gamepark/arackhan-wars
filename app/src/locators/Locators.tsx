import { ItemLocator } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { TableLocator } from './TableLocator'
import { PlayerDeckLocator } from './PlayerDeckLocator'
import { PlayerHandLocator } from './PlayerHandLocator'
import { battleFieldLocator } from './BattlefieldLocator'
import { PlayerTokenStockLocator } from './PlayerTokenStockLocator'
import { RoundTrackerLocator } from './RoundTrackerLocator'
import { PlayerDiscardLocator } from './PlayerDiscardLocator'
import { FactionTokenSpaceLocator } from './FactionTokenSpaceLocator'
import { AstralPlaneLocator } from './AstralPlaneLocator'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { FactionCardLocator } from './FactionCardLocator'
import { CombatIconLocator } from './CombatIconLocator'
import { AttributesIconsLocator } from './AttributesIconsLocator'
import { SkillLostIconLocator } from './SkillLostIconLocator'
import { CombatResultIconLocator } from './CombatResultIconLocator'
import { CardValueLocator } from './CardValueLocator'

export const Locators: Record<LocationType, ItemLocator<PlayerId, MaterialType, LocationType>> = {
  [LocationType.Table]: new TableLocator(),
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
