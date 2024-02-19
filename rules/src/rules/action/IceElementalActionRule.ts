import { CustomMove } from '@gamepark/rules-api'
import { EffectType } from '../../material/cards/Effect'
import { CustomMoveType } from '../../material/CustomMoveType'
import { Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { CardActionRule } from './CardActionRule'

export class IceElementalActionRule extends CardActionRule {
  getPlayerMoves() {
    return [
      this.rules().customMove(CustomMoveType.ChooseEffect, { type: EffectType.SetAttackDefense, attack: 0, defense: 3 }),
      this.rules().customMove(CustomMoveType.ChooseEffect, { type: EffectType.SetAttackDefense, attack: 2, defense: 1 }),
      this.rules().customMove(CustomMoveType.ChooseEffect, { type: EffectType.SetAttackDefense, attack: 3, defense: 0 })
    ]
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.ChooseEffect) {
      const card = this.remind(Memory.ActionCard)
      this.memorize(Memory.RoundEffects, effects => [...effects, { targets: [card], effect: move.data }])
      this.memorize(Memory.OncePerRound, cards => [...cards, card])
      return [this.rules().startRule(RuleId.ActivationRule)]
    }
    return []
  }
}
