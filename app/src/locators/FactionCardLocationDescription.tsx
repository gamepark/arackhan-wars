/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { css } from '@emotion/react'
import { factionCardDescription } from '../material/FactionCardDescription'
import { isCustomMoveType, Location, MaterialMove } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { areAdjacent } from '@gamepark/arackhan-wars/utils/adjacent.utils'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'

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
      //console.log(move)

      if (move.data.target === undefined) {
        const rules = new ArackhanWarsRules(context.game)
        const parentCard = rules.material(MaterialType.FactionCard).index(location.parent!)
        const movedCard = rules.material(MaterialType.FactionCard).index(move.data.card)
        return areAdjacent(parentCard, movedCard)
      }

      return location.parent === move.data.target
    }

    return false
  }
}
