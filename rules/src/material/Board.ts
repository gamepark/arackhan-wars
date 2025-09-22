import { Location, XYCoordinates } from '@gamepark/rules-api'
import { range } from 'es-toolkit'
import { LocationType } from './LocationType'

const xMax = 7, yMax = 5

export const battlefieldCoordinates: XYCoordinates[] = [
  ...range(3, xMax).map(x => ({ x, y: 0 })),
  ...range(xMax + 1).flatMap(x => range(1, yMax).map(y => ({ x, y }))),
  ...range(1, xMax - 2).map(x => ({ x, y: yMax }))
]

export const onBattlefieldAndAstralPlane = (location: Location) => location.type === LocationType.Battlefield || location.type === LocationType.AstralPlane

export function isInBattlefield(coordinates: Partial<XYCoordinates>): coordinates is XYCoordinates {
  const { x, y } = coordinates
  return x !== undefined && y !== undefined && x >= 0 && x <= xMax && y >= 0 && yMax <= 5
    && (y !== 0 || (x >= 3 && x < xMax)) && (y !== yMax || (x >= 1 && x <= xMax - 3))
}
