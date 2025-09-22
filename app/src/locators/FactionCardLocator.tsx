import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { getCardRule } from '@gamepark/arackhan-wars/rules/CardRule'
import { DropAreaDescription, Locator, MaterialContext } from '@gamepark/react-game'
import { isCustomMove, Location, MaterialMove } from '@gamepark/rules-api'
import { factionCardDescription } from '../material/FactionCardDescription'

export class FactionCardLocator extends Locator {
  locationDescription = new FactionCardLocationDescription()
  parentItemType = MaterialType.FactionCard

  getPositionOnParent(location: Location) {
    if (location.x === undefined) return this.positionOnParent
    return { x: 20 + (location.x % 3) * 30, y: 20 + Math.floor(location.x / 3) * 15 }
  }
}

class FactionCardLocationDescription extends DropAreaDescription {
  constructor() {
    super(factionCardDescription)
  }

  isMoveToLocation(move: MaterialMove, location: Location, context: MaterialContext) {
    const { player, rules } = context
    if (isCustomMove(move) && move.type === CustomMoveType.Attack) {
      if (move.data.target !== undefined) {
        return location.parent === move.data.target
      } else {
        const cardRule = getCardRule(rules.game, location.parent!)
        return cardRule.canBeAttacked && cardRule.item.location.player !== player
          && getCardRule(rules.game, move.data.card).canMeleeAttackTarget(location.parent!)
      }
    }

    return super.isMoveToLocation(move, location, context)
  }
}
