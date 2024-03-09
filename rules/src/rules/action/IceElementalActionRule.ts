import { CustomMove } from '@gamepark/rules-api'
import { EffectType } from '../../material/cards/Effect'
import { CustomMoveType } from '../../material/CustomMoveType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { CardActionRule } from './CardActionRule'
import { TargetingEffect } from './TargetingEffect'

export class IceElementalActionRule extends CardActionRule {
  canPlay(): boolean {
    return true
  }

  getPlayerMoves() {
    return [
      this.rules().customMove(CustomMoveType.ChooseEffect, { type: EffectType.SetAttackDefense, attack: 0, defense: 3 }),
      this.rules().customMove(CustomMoveType.ChooseEffect, { type: EffectType.SetAttackDefense, attack: 2, defense: 1 }),
      this.rules().customMove(CustomMoveType.ChooseEffect, { type: EffectType.SetAttackDefense, attack: 3, defense: 0 })
    ]
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.ChooseEffect) {
      this.memorize<TargetingEffect[]>(Memory.RoundEffects, effects => [...effects, { targets: [this.cardIndex], effect: move.data }])
      this.memorize<number[]>(Memory.OncePerRound, cards => [...cards, this.cardIndex])
      return [this.rules().startRule(RuleId.ActivationRule)]
    }
    return []
  }
}
