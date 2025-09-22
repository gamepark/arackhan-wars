import { FactionCard, getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { DropAreaDescription, ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { factionCardDescription } from '../material/FactionCardDescription'

export class BattlefieldLocator extends Locator {
  parentItemType = MaterialType.BattleMat
  locationDescription = new DropAreaDescription(factionCardDescription)

  coordinates = { z: 1 }

  getPositionOnParent = ({ x = 0, y = 0 }: Location, { player = 1 }: MaterialContext) => ({
    x: (player === 1 ? x : 7 - x) * 11.35 + 10.2,
    y: (player === 1 ? y : 5 - y) * 15.8 + 10.5
  })

  getItemRotateZ(item: MaterialItem, { player }: ItemContext) {
    return !item.location.rotation && getUniqueCard(item.id.front) === FactionCard.OneEyedHog && item.location.player === player ? 180 : 0
  }
}

export const battleFieldLocator = new BattlefieldLocator()
