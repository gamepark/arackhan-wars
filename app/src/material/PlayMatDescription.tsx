/** @jsxImportSource @emotion/react */
import board from '../images/boards/core-box-battle-mat.jpg'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { PlayMatRules } from './PlayMatRules'
import { battlefieldCoordinates } from '@gamepark/arackhan-wars/material/Board'
import { Location, MaterialItem } from '@gamepark/rules-api'

export const boardRatio = 576 / 576

export class PlayMatDescription extends BoardDescription {
  height = 57.6
  ratio = boardRatio
  image = board

  staticItem = { location: { type: LocationType.Table } }

  getLocations(_item: MaterialItem, context: MaterialContext): Location[] {
    return [
      ...this.getBattlefieldSpaces(),
      ...this.getAstralPlanes(context),
      ...this.getDecks(context),
      ...this.getDiscards(context)
    ]
  }

  rules = PlayMatRules

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

  private getDecks(context: MaterialContext) {
    return [{
      type: LocationType.PlayerDeck,
      player: context.player
    }]
  }

  private getDiscards({ rules: { players } }: MaterialContext) {
    return players.map(player => ({ type: LocationType.PlayerDiscard, player }))
  }
}

export const playMatDescription = new PlayMatDescription()
