import { MaterialDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { playMatDescription } from './BattleMatDescription'
import { factionCardDescription } from './FactionCardDescription'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { factionTokenDescription } from './FactionTokenDescription'
import { roundTrackerDescription } from './RoundTrackerDescription'
import { roundTrackerTokenDescription } from './RoundTrackerTokenDescription'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { factionCardFrenchDescription } from './FactionCardFrenchDescription'

export const Material: Record<MaterialType, MaterialDescription<PlayerId, MaterialType, LocationType>> = {
  [MaterialType.BattleMat]: playMatDescription,
  [MaterialType.FactionCard]: factionCardDescription,
  [MaterialType.FactionToken]: factionTokenDescription,
  [MaterialType.RoundTracker]: roundTrackerDescription,
  [MaterialType.RoundTrackerToken]: roundTrackerTokenDescription
}

export const materialI18n: Record<string, Partial<Record<MaterialType, MaterialDescription>>> = {
  'fr': {
    [MaterialType.FactionCard]: factionCardFrenchDescription,
  }
}

