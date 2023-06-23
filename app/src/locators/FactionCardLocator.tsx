/** @jsxImportSource @emotion/react */
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { XYCoordinates } from '@gamepark/rules-api'
import { ItemLocator, LocationRulesProps } from '@gamepark/react-game/dist/locators/ItemLocator'
import { FactionCardTokenSpaceRules } from './FactionCardTokenSpaceRules'

export class FactionCardLocator extends ItemLocator<Faction, MaterialType, LocationType> {
  parentItemType = MaterialType.FactionCard

  getPositionOnParent(): XYCoordinates {
    return { x: 49.7, y: 64.5 }
  }


  getLocationRules(props: LocationRulesProps<Faction, MaterialType, LocationType>): React.ReactNode {
    return <FactionCardTokenSpaceRules {...props} />
  }

}
