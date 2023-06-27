import { MaterialDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { playMatDescription } from './PlayMatDescription'
import { factionCardDescription } from './FactionCardDescription'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { factionTokenDescription } from './FactionTokenDescription'
import { roundTrackerDescription } from './RoundTrackerDescription'
import { roundTrackerTokenDescription } from './RoundTrackerTokenDescription'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export const Material: Record<MaterialType, MaterialDescription<PlayerId, MaterialType, LocationType>> = {
  [MaterialType.PlayMat]: playMatDescription,
  [MaterialType.FactionCard]: factionCardDescription,
  [MaterialType.FactionToken]: factionTokenDescription,
  [MaterialType.RoundTracker]: roundTrackerDescription,
  [MaterialType.RoundTrackerToken]: roundTrackerTokenDescription
}
