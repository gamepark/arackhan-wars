/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { LocationDescription } from '@gamepark/react-game'
import { LocationContext } from '@gamepark/react-game/dist/locators'
import { Location } from '@gamepark/rules-api'
import { factionCardDescription } from '../material/FactionCardDescription'
import { PlayerDeckHelp } from './PlayerDeckHelp'

export class PlayerDeckDescription extends LocationDescription {
  width = factionCardDescription.width
  ratio = factionCardDescription.ratio
  borderRadius = 0.4
  alwaysVisible = true

  getCoordinates(_location: Location, { rules }: LocationContext) {
    return { x: 0, y: 0, z: rules.game.rule?.id === RuleId.Mulligan ? 10 : 0 }
  }

  getExtraCss(_location: Location, { rules }: LocationContext) {
    if (rules.game.rule?.id === RuleId.Mulligan) {
      return enlarge
    }
    return
  }

  help = PlayerDeckHelp
}

const enlarge = css`
  font-size: 1.2em;
`