/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import board from '../images/boards/core-box-battle-mat.jpg'
import { BattleMatHelp } from './BattleMatHelp'

export const platMatSize = 57.6

export class BattleMatDescription extends BoardDescription {
  width = platMatSize
  height = platMatSize
  image = board

  staticItem = { location: { type: LocationType.BattleMatSpot } }

  getLocations = (_: MaterialItem, { rules: { players } }: MaterialContext) => players.flatMap(player => [
    { type: LocationType.PlayerDeck, player },
    { type: LocationType.PlayerDiscard, player },
    { type: LocationType.AstralPlane, x: 0, player },
    { type: LocationType.AstralPlane, x: 1, player }
  ])

  help = BattleMatHelp
}

export const battleMatDescription = new BattleMatDescription()
