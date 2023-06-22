/** @jsxImportSource @emotion/react */
import board from '../images/boards/core-box-battle-mat.jpg'
import { BoardDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { BattlefieldRules } from './BattlefieldRules'

export const boardRatio = 576 / 576

export class BattlefieldDescription extends BoardDescription {
  height = 57.6
  ratio = boardRatio
  image = board

  items = () => [{ location: { type: LocationType.Battlefield } }]
  rules = BattlefieldRules
}

export const battlefieldDescription = new BattlefieldDescription()

