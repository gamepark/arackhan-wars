import { isMoveItem, ItemMove } from '@gamepark/rules-api'
import { battlefieldCoordinates } from '../../material/Board'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { CardActionRule } from './CardActionRule'


export class ForcedExileActionRule extends CardActionRule {
  getPlayerMoves() {
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    return battlefieldCoordinates.flatMap(({ x, y }) => {
      if (battlefield.location(location => location.x === x && location.y === y).length) return []
      return battlefield.player(player => player !== this.player).filter((_, index) => {
        const card = getCardRule(this.game, index)
        return card.isCreature && !card.isImmuneToEnemySpells && card.thereIsAnotherCardAdjacentTo({ x, y })
      }).moveItems(item => ({ type: LocationType.Battlefield, x, y, player: item.location.player }))
    })
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.FactionCard && move.location.type === LocationType.Battlefield) {
      return this.afterCardAction()
    }
    return []
  }
}
