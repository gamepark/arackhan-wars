import { XYCoordinates } from '@gamepark/rules-api'
import range from 'lodash/range'

export const startingCoordinates = [{x: 3, y: 2}, {x: 3, y: 3}, {x: 4, y: 2}, {x: 4, y: 3}]

export const battlefieldSpaceCoordinates: XYCoordinates[] = [
  ...range(3, 7).map(x => ({ x, y: 0 })),
  ...range(8).flatMap(x => range(1, 5).map(y => ({ x, y }))),
  ...range(1, 5).map(x => ({ x, y: 5 }))
]
