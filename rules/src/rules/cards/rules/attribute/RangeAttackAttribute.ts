import { Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttribute, CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { getDistance } from '../../../../utils/adjacent.utils'
import { AttackAttributeRule } from './AttackAttribute'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { FactionCardInspector } from '../helper/FactionCardInspector'

export class RangeAttackAttributeRule extends AttackAttributeRule {

  constructor(game: MaterialGame, readonly strength: number) {
    super(game)
  }

  getLegalAttacks(attacker: Material, opponentsCards: Material, cardInspector: FactionCardInspector): MaterialMove[] {
    return opponentsCards.getIndexes()
      .filter((index: number) => this.canAttack(attacker, opponentsCards.index(index), cardInspector))
      .map((index: number) => this.rules().customMove(CustomMoveType.Attack, {
        card: attacker.getIndex(),
        target: index
      }))
  }

  canAttack(attacker: Material, opponent: Material, cardInspector: FactionCardInspector): boolean {
    if (!cardInspector.canBeAttacked(attacker.getIndex(), opponent.getIndex())) return false
    const attackerCard = attacker.getItem()!
    const opponentCard = opponent.getItem()!
    return getDistance(
      { x: attackerCard.location.x!, y: attackerCard.location.y! },
      { x: opponentCard.location.x!, y: opponentCard.location.y! }
    ) <= this.strength
  }
}

export const rangedAttack = (distance: number) => new class extends Attribute<RangeAttackAttributeRule> {
  kind = AttributeKind.Attack
  type = CardAttributeType.RangedAttack

  cardAttribute: CardAttribute = { type: CardAttributeType.RangedAttack, strength: distance }

  getAttributeRule(game: MaterialGame) {
    return new RangeAttackAttributeRule(game, distance)
  }

}
