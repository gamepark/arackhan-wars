import { isSelectItemType, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { CardActionRule } from './CardActionRule'

export class TomurDiscActionRule extends CardActionRule {

  getPlayerMoves() {
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
      .player(player => player !== this.player)
      .filter((_, index) => {
        const cardRule = getCardRule(this.game, index)
        return cardRule.isCreature && cardRule.isActive
      }).selectItems()
  }


  afterItemMove(move: ItemMove) {
    if (isSelectItemType(MaterialType.FactionCard)(move)) {
      return [
        this.material(MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(move.itemIndex).rotateItem(true),
        ...this.afterCardAction()
      ]
    }
    return []
  }
}
