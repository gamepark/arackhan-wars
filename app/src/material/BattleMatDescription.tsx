/** @jsxImportSource @emotion/react */
import { battlefieldCoordinates } from '@gamepark/arackhan-wars/material/Board'
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

  staticItem = { location: { type: LocationType.Table } }

  getLocations(_item: MaterialItem, context: MaterialContext) {
    return [
      ...this.getBattlefieldSpaces(),
      ...this.getAstralPlanes(context),
      ...this.getDecks(context),
      ...this.getDiscards(context)
    ]
  }

  help = BattleMatHelp

  private getBattlefieldSpaces = () => {
    return battlefieldCoordinates.map((space) => ({
      type: LocationType.Battlefield,
      x: space.x,
      y: space.y
    }))
  }

  private getAstralPlanes = ({ rules: { players } }: MaterialContext) => {
    return players.flatMap(player => [0, 1].map(x => ({ type: LocationType.AstralPlane, x, player })))
  }

  private getDecks({ rules: { players } }: MaterialContext) {
    return players.map(player => ({ type: LocationType.PlayerDeck, player }))
  }

  private getDiscards({ rules: { players } }: MaterialContext) {
    return players.map(player => ({ type: LocationType.PlayerDiscard, player }))
  }
}

export const battleMatDescription = new BattleMatDescription()
