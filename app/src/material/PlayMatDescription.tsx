/** @jsxImportSource @emotion/react */
import board from '../images/boards/core-box-battle-mat.jpg'
import { BoardDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { PlayMatRules } from './PlayMatRules'

export const boardRatio = 576 / 576

export class PlayMatDescription extends BoardDescription {
  height = 57.6
  ratio = boardRatio
  image = board

  items = () => [{ location: { type: LocationType.Table } }]
  rules = PlayMatRules
}

export const playMatDescription = new PlayMatDescription()

