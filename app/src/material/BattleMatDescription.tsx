/** @jsxImportSource @emotion/react */
import board from '../images/boards/core-box-battle-mat.jpg'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { BattleMatRules } from './BattleMatRules'
import { battlefieldCoordinates } from '@gamepark/arackhan-wars/material/Board'
import { Location, MaterialItem } from '@gamepark/rules-api'

export const platMatSize = 57.6

export class BattleMatDescription extends BoardDescription {
  width = platMatSize
  height = platMatSize
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

  rules = BattleMatRules

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

export const playMatDescription = new BattleMatDescription()
