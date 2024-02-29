import { isMoveItem, ItemMove } from '@gamepark/rules-api'
import { onBattlefieldAndAstralPlane } from '../../material/Board'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { CardActionRule } from './CardActionRule'

export class DiscardEnemySpellActionRule extends CardActionRule {
  getPlayerMoves() {
    return this.material(MaterialType.FactionCard).location(onBattlefieldAndAstralPlane)
      .filter((item, index) => item.location.player !== this.player && getCardRule(this.game, index).isSpell)
      .moveItems(item => ({ type: LocationType.PlayerDiscard, player: item.location.player }))
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.FactionCard && move.location.type === LocationType.PlayerDiscard) {
      return this.afterCardAction()
    }
    return []
  }
}
