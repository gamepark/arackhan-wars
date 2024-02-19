import { CustomMove, MaterialMove } from '@gamepark/rules-api'
import { isCreature } from '../../material/cards/Creature'
import { EffectType } from '../../material/cards/Effect'
import { CustomMoveType } from '../../material/CustomMoveType'
import { FactionCard, FactionCardsCharacteristics } from '../../material/FactionCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { CardActionRule } from './CardActionRule'
import { TargetingEffect } from './TargetingEffect'

export class MimicryActionRule extends CardActionRule {

  getPlayerMoves() {
    const creaturesOnBattlefield = this.material(MaterialType.FactionCard).location(LocationType.Battlefield)
      .filter((item) => isCreature(FactionCardsCharacteristics[item.id.front]))

    if (this.target === undefined) {
      return creaturesOnBattlefield.player(this.player).getIndexes()
        .map(index => this.rules().customMove(CustomMoveType.ChooseCard, index))
    } else {
      return creaturesOnBattlefield.getIndexes()
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
