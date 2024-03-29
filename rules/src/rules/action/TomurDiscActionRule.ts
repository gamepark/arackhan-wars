import { isSelectItemType, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { CardActionRule } from './CardActionRule'

export class TomurDiscActionRule extends CardActionRule {

  canPlay(): boolean {
    return this.enemyActiveCreatures.length > 0
  }

  get enemyActiveCreatures() {
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
      .player(player => player !== this.player)
      .index(index => {
        const cardRule = getCardRule(this.game, index)
        return cardRule.isCreature && cardRule.isActive
      })
  }

  getPlayerMoves() {
    return this.enemyActiveCreatures.selectItems()
  }


  afterItemMove(move: ItemMove) {
    if (isSelectItemType(MaterialType.FactionCard)(move)) {
      delete this.material(MaterialType.FactionCard).getItem(move.itemIndex)!.selected
      return [
        this.material(MaterialType.FactionToken).location(LocationType.FactionTokenSpace).parent(move.itemIndex).rotateItem(true),
        ...this.afterCardAction()
      ]
    }
    return []
  }
}
