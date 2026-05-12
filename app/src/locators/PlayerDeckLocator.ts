import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { DeckLocator, DropAreaDescription, ItemContext, LocationContext, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { factionCardDescription } from '../material/FactionCardDescription'

export class PlayerDeckLocator extends DeckLocator {
  locationDescription = new PlayerDeckDescription()
  parentItemType = MaterialType.BattleMat
  getPositionOnParent = (location: Location, { player = 1 }: MaterialContext) => location.player === player ? { x: 92.2, y: 90 } : { x: 7.7, y: 9.9 }
  getRotateZ = (location: Location, { player = 1 }: ItemContext) => location.player === player ? 0 : 180
}

class PlayerDeckDescription extends DropAreaDescription {
  constructor() {
    super(factionCardDescription)
  }

  getExtraCss = (_: Location, { rules }: LocationContext) => rules.game.rule?.id === RuleId.Mulligan && css`font-size: 1.2em;`
}
