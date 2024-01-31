import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { factionCardDescription } from '../material/FactionCardDescription'

export const DeckbuildingMaterial: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.FactionCard]: factionCardDescription
}
