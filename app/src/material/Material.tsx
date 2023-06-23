import { MaterialDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { playMatDescription } from './PlayMatDescription'
import { factionCardDescription } from './FactionCardDescription'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { factionTokenDescription } from './FactionTokenDescription'
import { roundTrackerDescription } from './RoundTrackerDescription'
import { roundTrackerTokenDescription } from './RoundTrackerTokenDescription'

export const Material: Record<MaterialType, MaterialDescription<Faction, MaterialType, LocationType>> = {
  [MaterialType.PlayMat]: playMatDescription,
  [MaterialType.FactionCard]: factionCardDescription,
  [MaterialType.FactionToken]: factionTokenDescription,
  [MaterialType.RoundTracker]: roundTrackerDescription,
  [MaterialType.RoundTrackerToken]: roundTrackerTokenDescription
}
