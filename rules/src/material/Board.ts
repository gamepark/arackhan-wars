import { Location, XYCoordinates } from '@gamepark/rules-api'
import range from 'lodash/range'
import { LocationType } from './LocationType'

export const battlefieldCoordinates: XYCoordinates[] = [
  ...range(3, 7).map(x => ({ x, y: 0 })),
  ...range(8).flatMap(x => range(1, 5).map(y => ({ x, y }))),
  ...range(1, 5).map(x => ({ x, y: 5 }))
]

export const onBattlefieldAndAstralPlane = (location: Location) => location.type === LocationType.Battlefield || location.type === LocationType.AstralPlane