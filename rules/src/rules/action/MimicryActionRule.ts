import { CustomMove, MaterialMove } from '@gamepark/rules-api'
import { EffectType } from '../../material/cards/Effect'
import { CustomMoveType } from '../../material/CustomMoveType'
import { FactionCard } from '../../material/FactionCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { CardActionRule } from './CardActionRule'
import { TargetingEffect } from './TargetingEffect'

export class MimicryActionRule extends CardActionRule {

  canPlay(): boolean {
    const creatures = this.creaturesOnBattlefield
    return creatures.length > 2 && creatures.player(this.player).length > 0
  }

  get creaturesOnBattlefield() {
    return this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
      .index(index => getCardRule(this.game, index).isCreature)
  }

  getPlayerMoves() {
    if (this.target === undefined) {
      return this.creaturesOnBattlefield.player(this.player).getIndexes()
        .map(index => this.rules().customMove(CustomMoveType.ChooseCard, index))
    } else {
      return this.creaturesOnBattlefield.getIndexes()
        .filter(index => index !== this.target)
        .map(index => this.rules().customMove(CustomMoveType.ChooseCard, index))
    }
  }

  get target() {
    return this.remind<number | undefined>(Memory.TargetCard)
  }

  onCustomMove(move: CustomMove) {
    const moves: MaterialMove[] = []
    if (move.type === CustomMoveType.ChooseCard) {
      const target = this.target
      if (target === undefined) {
        this.memorize(Memory.TargetCard, move.data)
      } else {
        this.forget(Memory.TargetCard)
        const mimicTarget = this.material(MaterialType.FactionCard).getItem(move.data)?.id.front as FactionCard
        this.memorize<TargetingEffect[]>(Memory.TurnEffects, turnEffects =>
          [...turnEffects, { targets: [target], effect: { type: EffectType.Mimic, target: mimicTarget } }]
        )
        const cardRule = getCardRule(this.game, target)
        if (cardRule.hasFlippedToken) {
          moves.push(cardRule.token.rotateItem(false))
        }
        moves.push(...this.afterCardAction())
      }
    }
    return moves
  }
}
