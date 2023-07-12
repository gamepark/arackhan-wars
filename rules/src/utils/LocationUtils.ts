import { LocationType } from '../material/LocationType'
import { Location } from '@gamepark/rules-api'


export const onBattlefieldAndAstralPlane = (location: Location) => location.type === LocationType.Battlefield || location.type === LocationType.AstralPlane
