import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { battleMatDescription } from './BattleMatDescription'
import { factionCardDescription } from './FactionCardDescription'
import { factionCardFrenchDescription } from './FactionCardFrenchDescription'
import { factionTokenDescription } from './FactionTokenDescription'
import { roundTrackerDescription } from './RoundTrackerDescription'
import { roundTrackerTokenDescription } from './RoundTrackerTokenDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.BattleMat]: battleMatDescription,
  [MaterialType.FactionCard]: factionCardDescription,
  [MaterialType.FactionToken]: factionTokenDescription,
  [MaterialType.RoundTracker]: roundTrackerDescription,
  [MaterialType.RoundTrackerToken]: roundTrackerTokenDescription
}

export const materialI18n: Record<string, Partial<Record<MaterialType, MaterialDescription>>> = {
  'fr': {
    [MaterialType.FactionCard]: factionCardFrenchDescription
  }
}

