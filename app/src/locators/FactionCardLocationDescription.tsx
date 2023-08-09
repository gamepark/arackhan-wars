/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { css } from '@emotion/react'
import { factionCardDescription } from '../material/FactionCardDescription'
import { isCustomMoveType, isMoveItemLocation, Location, MaterialMove } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { isLocationSubset } from '@gamepark/react-game/dist/components/material/utils/IsLocationSubset'
import { getCardRule } from '@gamepark/arackhan-wars/rules/cards/rules/base/CardRule'

export class FactionCardLocationDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  height = factionCardDescription.width / factionCardDescription.ratio
  width = factionCardDescription.width
  alwaysVisible = false

  getExtraCss() {
    return css`
      height: 100%;
      width: 100%;
      border-radius: inherit;
    `
  }

  canDrop(move: MaterialMove, location: Location, context: MaterialContext) {
    if (isCustomMoveType(CustomMoveType.Attack)(move)) {
      if (move.data.target !== undefined) {
        return location.parent === move.data.target
      } else {
        const cardRule = getCardRule(context.game, location.parent!)
        return cardRule.canBeAttacked && cardRule.item.location.player !== context.player
          && getCardRule(context.game, move.data.card).canAttackTarget(location.parent!)
      }
    }

    if (isMoveItemLocation(move) && move.itemType === MaterialType.FactionCard) {
      const rules = new ArackhanWarsRules(context.game)
      const parentCard = rules.material(MaterialType.FactionCard).index(location.parent!)
      return isLocationSubset(move.position.location, parentCard.getItem()!.location)
    }

    return super.canDrop(move, location, context)
  }
}
