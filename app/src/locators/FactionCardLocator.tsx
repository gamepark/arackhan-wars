/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { ItemLocator, LocationRulesProps } from '@gamepark/react-game/dist/locators/ItemLocator'
import { FactionCardTokenSpaceRules } from './FactionCardTokenSpaceRules'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'

export class FactionCardLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  parentItemType = MaterialType.FactionCard

  getPositionOnParent(): XYCoordinates {
    return { x: 49.7, y: 64.5 }
  }

  getParentItemId(location: Location<PlayerId, LocationType>): number | undefined {
    return location.id
  }


  getLocationRules(props: LocationRulesProps<PlayerId, MaterialType, LocationType>): React.ReactNode {
    return <FactionCardTokenSpaceRules {...props} />
  }

}
