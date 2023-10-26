import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { FactionCardAnimations } from './FactionCardAnimations'

export class ArackhanWarsAnimations extends MaterialGameAnimations {
  itemsAnimations = {
    [MaterialType.FactionCard]: new FactionCardAnimations()
  }
}