import { LocationType } from './LocationType'
import { PositiveSequenceStrategy } from '@gamepark/rules-api'
import { MaterialType } from './MaterialType'

export const locationsStrategies = {
  [MaterialType.FactionCard]: {
    [LocationType.PlayerDeck]: new PositiveSequenceStrategy(),
    [LocationType.PlayerDiscard]: new PositiveSequenceStrategy(),
    [LocationType.Hand]: new PositiveSequenceStrategy()
  }
}
