import { Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttributeType } from '../../descriptions/base/FactionCardDetail'
import { getDistance } from '../../../../utils/adjacent.utils'
import { AttackAttributeRule } from './AttackAttribute'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { FactionCardEffectHelper } from '../helper/FactionCardEffectHelper'

class RangeAttackAttributeRule extends AttackAttributeRule {

  constructor(game: MaterialGame, readonly strength: number) {
    super(game)
  }

  getLegalAttacks(attacker: Material, opponentsCards: Material, effectHelper: FactionCardEffectHelper): MaterialMove[] {
    return opponentsCards.getIndexes()
      .filter((index: number) => this.canAttack(attacker, opponentsCards.index(index)!, effectHelper))
      .map((index: number) => this.rules().customMove(CustomMoveType.Attack, {
        card: attacker.getIndex(),
        target: index
      }))
  }

  canAttack(attacker: Material, opponent: Material, effectHelper: FactionCardEffectHelper): boolean {
    if (!effectHelper.canBeAttacked(attacker.getIndex(), opponent.getIndex())) return false
    const attackerCard = attacker.getItem()!
    const opponentCard = opponent.getItem()!
    return getDistance(
      { x: attackerCard.location.x!, y: attackerCard.location.y! },
      { x: opponentCard.location.x!, y: opponentCard.location.y! }
    ) <= this.strength
  }

  canAttackInGroup(): boolean {
    return true
  }
}

export const rangedAttack = (strength: number) => new class extends Attribute<RangeAttackAttributeRule> {
  kind = AttributeKind.Attack
  type = CardAttributeType.RangedAttack

  getAttributeRule(game: MaterialGame) {
    return new RangeAttackAttributeRule(game, strength)
  }

}
