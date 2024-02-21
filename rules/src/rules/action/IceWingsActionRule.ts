import { CustomMove, isMoveItem, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { battlefieldCoordinates } from '../../material/Board'
import { CustomMoveType } from '../../material/CustomMoveType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { CardActionRule } from './CardActionRule'

export class IceWingsActionRule extends CardActionRule {
  onRuleStart() {
    this.memorize(Memory.Count, 2)
    return []
  }

  getPlayerMoves() {
    const battlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
    const myCards = battlefield.player(this.player)
    const moves: MaterialMove[] = battlefieldCoordinates.flatMap(({ x, y }) => {
      if (battlefield.location(location => location.x === x && location.y === y).length) return []
      return myCards.filter((_, index) => {
        const rule = getCardRule(this.game, index)
        const characteristics = rule.characteristics
        return rule.isCreature && characteristics !== undefined && characteristics.value <= 5 && rule.thereIsAnotherCardAdjacentTo({ x, y })
      }).moveItems({ type: LocationType.Battlefield, x, y, player: this.player })
    })
    moves.push(this.rules().customMove(CustomMoveType.Pass))
    return moves
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItem(move) && move.itemType === MaterialType.FactionCard && move.location.type === LocationType.Battlefield) {
      if (this.remind(Memory.Count) > 1) {
        this.memorize(Memory.Count, count => count - 1)
      } else {
        return this.afterCardAction()
      }
    }
    return []
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return this.afterCardAction()
    }
    return []
  }

  afterCardAction(): MaterialMove[] {
    this.forget(Memory.Count)
    return super.afterCardAction()
  }
}
