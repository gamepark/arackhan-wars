import { CreateItemAnimations, MaterialAnimations } from '@gamepark/react-game'
import { ItemMoveType } from '@gamepark/rules-api'
import { MoveFactionCardAnimation } from './MoveFactionCardAnimation'

export class FactionCardAnimations extends MaterialAnimations {
  constructor() {
    super()
    this.animations[ItemMoveType.Create] = new CreateItemAnimations(0)
    this.animations[ItemMoveType.Move] = new MoveFactionCardAnimation()
  }
}