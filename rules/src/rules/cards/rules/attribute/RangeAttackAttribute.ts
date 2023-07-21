import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttributeType } from '../../descriptions/base/FactionCardDetail'
import { getDistance } from '../../../../utils/adjacent.utils'
import { Material, MaterialMove } from '@gamepark/rules-api'
import { AttackAttributeRule } from './AttackAttribute'
import { CustomMoveType } from '../../../../material/CustomMoveType'

class RangeAttackAttributeRule extends AttackAttributeRule {

  constructor(game: MaterialGame, readonly strength: number) {
    super(game)
  }

  getLegalAttacks(attacker: Material, opponentsCards: Material): MaterialMove[] {
    return opponentsCards.getIndexes()
      .filter((index: number) => this.canAttack(attacker, opponentsCards.index(index)!))
      .map((index: number) => this.rules().customMove(CustomMoveType.Attack, {
        card: attacker.getIndex(),
        targets: [index]
      }))
  }

  canAttack(attacker: Material, opponent: Material): boolean {
    const attackerItem = attacker.getItem()!
    const opponentItem = opponent.getItem()!
    return getDistance(
      { x: attackerItem.location.x!, y: attackerItem.location.y! },
      { x: opponentItem.location.x!, y: opponentItem.location.y! }
    ) <= this.strength
  }
}

export const rangedAttack = (strength: number) => new class extends Attribute<RangeAttackAttributeRule> {
  kind = AttributeKind.Attack
  type = CardAttributeType.RangedAttack

  getAttributeRule(game: MaterialGame) {
    return new RangeAttackAttributeRule(game, strength)
  }

}
