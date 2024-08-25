import { CustomMove, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { onBattlefieldAndAstralPlane } from '../material/Board'
import { DiscardTiming } from '../material/cards/FactionCardCharacteristics'
import { Spell } from '../material/cards/Spell'
import { CustomMoveType } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getCardRule } from './CardRule'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class EndOfTurnRule extends PlayerTurnRule {
  getPlayerMoves() {
    return [
      ...this.cardsMoves,
      this.customMove(CustomMoveType.Pass)
    ]
  }

  get cardsMoves(): MaterialMove[] {
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield).player(this.player).getIndexes().flatMap(index =>
      getCardRule(this.game, index).endOfTurnMoves
    )
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.FactionCard)(move) && move.location.type === LocationType.Battlefield) {
      this.memorize(Memory.MovedCards, movedCards => [...movedCards, move.itemIndex])
    }
    return []
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return this.endPlayerTurn()
    }
    return []
  }

  endPlayerTurn() {
    const moves: MaterialMove[] = []
    const nextPlayer = this.nextPlayer
    this.memorize(Memory.TurnEffects, [])
    moves.push(...this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)
      .index(index => (getCardRule(this.game, index).characteristics as Spell)?.discardTiming === DiscardTiming.ActivationOrEndOfTurn)
      .moveItems({ type: LocationType.PlayerDiscard, player: this.player })
    )
    if (nextPlayer !== this.remind(Memory.StartPlayer)) {
      moves.push(this.startPlayerTurn(RuleId.ActivationRule, nextPlayer))
    } else {
      moves.push(this.startRule(RuleId.EndOfRoundRule))
    }
    return moves
  }
}