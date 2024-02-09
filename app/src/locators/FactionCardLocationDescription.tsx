/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { getCardRule } from '@gamepark/arackhan-wars/rules/CardRule'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { isLocationSubset } from '@gamepark/react-game/dist/components/material/utils'
import { isCustomMove, isMoveItemType, Location, MaterialMove } from '@gamepark/rules-api'
import { factionCardDescription } from '../material/FactionCardDescription'

export class FactionCardLocationDescription extends LocationDescription {
  width = factionCardDescription.width
  ratio = factionCardDescription.ratio
  alwaysVisible = false

  getExtraCss = () => css`
    border-radius: inherit;
  `

  isMoveToLocation(move: MaterialMove, location: Location, context: MaterialContext) {
    const { player, rules } = context
    if (isCustomMove(move) && move.type === CustomMoveType.Attack) {
      if (move.data.target !== undefined) {
        return location.parent === move.data.target
      } else {
        const cardRule = getCardRule(rules.game, location.parent!)
        return cardRule.canBeAttacked && cardRule.item.location.player !== player
          && getCardRule(rules.game, move.data.card).canAttackTarget(location.parent!)
      }
    }

    if (isMoveItemType(MaterialType.FactionCard)(move)) {
      const parentCardLocation = rules.material(MaterialType.FactionCard).getItem(location.parent!)?.location
      return parentCardLocation !== undefined && isLocationSubset(parentCardLocation, move.location as Location)
    }

    return super.isMoveToLocation(move, location, context)
  }
}
