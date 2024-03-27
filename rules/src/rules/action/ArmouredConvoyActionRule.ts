import { Material, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { EffectType } from '../../material/cards/Effect'
import { getCardRule } from '../CardRule'
import { Memory } from '../Memory'
import { MoveCardsActionRule } from './MoveCardsActionRule'
import { TargetingEffect } from './TargetingEffect'

export class ArmouredConvoyActionRule extends MoveCardsActionRule {
  moves = 1
  maxDistance = 3

  getCardsAllowedToMove(): Material {
    return this.battlefield.player(this.player).index(index => getCardRule(this.game, index).isCreature)
  }

  afterCardMove(move: MoveItem): MaterialMove[] {
    this.memorize<TargetingEffect[]>(Memory.RoundEffects, effects => [...effects,
      { targets: [move.itemIndex], effect: { type: EffectType.Attack, modifier: 1 } }
    ])
    return super.afterCardMove(move)
  }
}
