import { Material } from '@gamepark/rules-api'
import { getCardRule } from '../CardRule'
import { MoveCardsActionRule } from './MoveCardsActionRule'

export class TeleportationActionRule extends MoveCardsActionRule {
  moves = 1

  getCardsAllowedToMove(): Material {
    return this.battlefield.player(this.player).filter((_, index) => getCardRule(this.game, index).isCreature)
  }
}
