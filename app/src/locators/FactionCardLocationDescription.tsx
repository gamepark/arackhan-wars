/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { css } from '@emotion/react'
import { factionCardDescription } from '../material/FactionCardDescription'
import { isCustomMove, isMoveItemLocation, Location, MaterialMove } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { getCardRule } from '@gamepark/arackhan-wars/rules/cards/rules/base/CardRule'

export class FactionCardLocationDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  width = factionCardDescription.width
  ratio = factionCardDescription.ratio
  alwaysVisible = false

  getExtraCss() {
    return css`
      height: 100%;
      width: 100%;
      border-radius: inherit;
    `
  }

  canDrop(move: MaterialMove, location: Location, context: MaterialContext) {
    if (isCustomMove(move) && move.type === CustomMoveType.Attack) {
      if (move.data.target !== undefined) {
        return location.parent === move.data.target
      } else {
        const cardRule = getCardRule(context.game, location.parent!)
        return cardRule.canBeAttacked && cardRule.item.location.player !== context.player
          && getCardRule(context.game, move.data.card).canAttackTarget(location.parent!)
      }
    }

    if (isMoveItemLocation(move) && move.itemType === MaterialType.FactionCard && move.position.location.type === LocationType.Battlefield) {
      const rules = new ArackhanWarsRules(context.game)
      const parentCardLocation = rules.material(MaterialType.FactionCard).index(location.parent!).getItem()?.location
      return move.position.location.x === parentCardLocation?.x && move.position.location.y === parentCardLocation?.y
    }

    return super.canDrop(move, location, context)
  }
}
