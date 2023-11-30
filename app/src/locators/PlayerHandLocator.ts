import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'

export class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, { player, rules }: ItemContext) {
    if (location.player === (player ?? rules.players[0])) {
      return { x: 50, y: 12, z: 10 }
    } else {
      return { x: 50, y: -12, z: 10 }
    }
  }

  getBaseAngle(item: MaterialItem, { player, rules }: ItemContext) {
    return item.location.player === (player ?? rules.players[0]) ? 0 : -180
  }

  getGapMaxAngle() {
    return 1.2
  }

  getMaxAngle() {
    return 9
  }

  getRadius() {
    return 300
  }
}
