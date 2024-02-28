/** @jsxImportSource @emotion/react */
import { FactionCard, getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { ItemContext, ItemLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { BattlefieldDescription } from './BattlefieldDescription'

export class BattlefieldLocator extends ItemLocator {
  locationDescription = new BattlefieldDescription()
  parentItemType = MaterialType.BattleMat

  getPositionOnParent(location: Location, { player }: MaterialContext) {
    const x = player === 2 ? 7 - location.x! : location.x!
    const y = player === 2 ? 5 - location.y! : location.y!
    return { x: x * 11.35 + 10.2, y: y * 15.8 + 10.5 }
  }

  getRotateZ(item: MaterialItem, { player }: ItemContext) {
    if (!item.location.rotation && getUniqueCard(item.id.front) === FactionCard.OneEyedHog && item.location.player === player) {
      return 180
    }
    return 0
  }
}

export const battleFieldLocator = new BattlefieldLocator()
