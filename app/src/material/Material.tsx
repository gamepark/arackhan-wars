import { MaterialDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { battlefieldDescription } from './BattlefieldDescription'
import { factionCardDescription } from './FactionCardDescription'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { factionTokenDescription } from './FactionTokenDescription'
import { roundTrackerDescription } from './RoundTrackerDescription'
import { roundTrackerTokenDescription } from './RoundTrackerTokenDescription'

export const Material: Record<MaterialType, MaterialDescription<Faction, MaterialType, LocationType>> = {
  [MaterialType.Battlefield]: battlefieldDescription,
  [MaterialType.FactionCard]: factionCardDescription,
  [MaterialType.FactionToken]: factionTokenDescription,
  [MaterialType.RoundTracker]: roundTrackerDescription,
  [MaterialType.RoundTrackerToken]: roundTrackerTokenDescription
}
