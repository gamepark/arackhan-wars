import { CustomMove, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { FactionCardKind } from '../../descriptions/base/FactionCardDetail'
import { CardActionRule } from './CardActionRule'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { ExchangedCharacteristics } from './ActionMemory'


export class MimicryActionRule extends CardActionRule {

  getPlayerMoves() {
    const battlefield = this
      .material(MaterialType.FactionCard)
      .location(LocationType.Battlefield)
      .filter((item) => getFactionCardDescription(item.id.front).kind === FactionCardKind.Creature)

    const allCardsIndexes = battlefield.getIndexes()
    const alliedCardIndexes = battlefield.player(this.player).getIndexes()

    const moves = []
    for (const alliedCardIndex of allCardsIndexes) {

      for (const otherCardIndex of alliedCardIndexes) {
        if (alliedCardIndex === otherCardIndex) continue
        moves.push(this.rules().customMove(CustomMoveType.ExchangeCharacteristics, { source: alliedCardIndex, target: otherCardIndex }))
      }
    }

    return moves
  }

  onCustomMove(move: CustomMove): MaterialMove[] {
    const { exchanges = [] } = this.getGameMemory<ExchangedCharacteristics>(this.player)
    this.memorizeOnGame<ExchangedCharacteristics>({ exchanges: [...exchanges, { ...move.data }] }, this.player)
    return super.afterCardAction()
  }
}
