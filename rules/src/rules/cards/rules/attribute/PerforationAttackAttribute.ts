import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttributeType } from '../../descriptions/base/FactionCardDetail'
import { Material, MaterialMove } from '@gamepark/rules-api'
import { AttackAttributeRule } from './AttackAttribute'
import { CustomMoveType } from '../../../../material/CustomMoveType'

class PerforationAttackAttribute extends AttackAttributeRule {

  constructor(game: MaterialGame) {
    super(game)
  }

  getLegalAttacks(attacker: Material, _opponentsCards: Material): MaterialMove[] {
    const northOpponents = this.getOpponentsInDirection(attacker, _opponentsCards, { y: -1 })
    const southOpponents = this.getOpponentsInDirection(attacker, _opponentsCards, { y: 1 })
    const westOpponents = this.getOpponentsInDirection(attacker, _opponentsCards, { x: -1 })
    const eastOpponents = this.getOpponentsInDirection(attacker, _opponentsCards, { x: 1 })

    return [
      northOpponents,
      southOpponents,
      westOpponents,
      eastOpponents
    ].map((opponents) => this.rules().customMove(CustomMoveType.Attack, {
      card: attacker.getIndex(),
      targets: opponents
    }))
  }

  getOpponentsInDirection(attacker: Material, opponentsCards: Material, direction: { x?: number, y?: number }) {
    const attackerCard = attacker.getItem()!
    const startingSearch = { x: attackerCard.location.x!, y: attackerCard.location.y! }

    const opponents: number[] = []
    for (let i = 1; i <= 8; i++) {
      const newOpponent = opponentsCards.filter((opponentCard) =>
        opponentCard.location.x === startingSearch.x + i * (direction.x ?? 0) &&
        opponentCard.location.y === startingSearch.y + i * (direction.y ?? 0)
      )

      if (newOpponent.length) {
        opponents.push(newOpponent.getIndex())
      } else {
        return opponents
      }
    }

    return opponents
  }

  getAttackValue(attack: number, _attacker: Material, _opponent: Material): number {
    const attackerCard = _attacker.getItem()!
    const opponentCard = _opponent.getItem()!
    const axis = attackerCard.location.x === opponentCard.location.x ? 'y' : 'x'
    return attack - (Math.abs(attackerCard.location[axis]! - opponentCard.location[axis]!) - 1)
  }
}

export const perforation = new class extends Attribute<PerforationAttackAttribute> {
  kind = AttributeKind.Attack
  type = CardAttributeType.Perforation

  getAttributeRule(game: MaterialGame) {
    return new PerforationAttackAttribute(game)
  }

}
