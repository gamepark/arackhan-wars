import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DropAreaDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { isMoveItem, Location, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { factionCardDescription } from '../material/FactionCardDescription'

export class BattlefieldLocator extends Locator {
  parentItemType = MaterialType.BattleMat
  locationDescription = new BattlefieldDescription()

  coordinates = { z: 1 }

  getPositionOnParent = ({ x = 0, y = 0 }: Location, { player = 1 }: MaterialContext) => ({
    x: (player === 1 ? x : 7 - x) * 11.35 + 10.2,
    y: (player === 1 ? y : 5 - y) * 15.8 + 10.5
  })
}

class BattlefieldDescription extends DropAreaDescription {
  constructor() {
    super(factionCardDescription)
  }

  isMoveToLocation(move: MaterialMove, location: Location, context: MaterialContext): boolean {
    return !this.isSwapCards(move, context) && super.isMoveToLocation(move, location, context)
  }

  private isSwapCards = (move: MaterialMove, { rules }: MaterialContext) =>
    isMoveItem(move) && move.itemType === MaterialType.FactionCard
    && move.location?.type === LocationType.Battlefield
    && rules.material(MaterialType.FactionCard).location(location =>
      location.type === LocationType.Battlefield && location.x === move.location?.x && location.y === move.location?.y
    ).length > 0
}

export const battleFieldLocator = new BattlefieldLocator()
