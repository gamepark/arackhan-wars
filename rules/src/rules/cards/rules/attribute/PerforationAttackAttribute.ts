import { Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { AttackAttributeRule } from './AttackAttribute'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { getCharacteristics } from '../../../../material/FactionCard'
import uniq from 'lodash/uniq'

export class PerforationAttackAttribute extends AttackAttributeRule {

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
    ].flatMap((opponents) => {
      if (!opponents.length) return []

      return this.rules().customMove(CustomMoveType.Attack, {
        card: attacker.getIndex(),
        target: opponents[0]
      })
    })
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

  getTargets(attacker: Material, opponent: Material, opponentsCards: Material): number[] {
    if (!opponent.length) return []
    const attackerCard = attacker.getItem()!
    const opponentCard = opponent.getItem()!

    const attackerCardDescription = getCharacteristics(attacker.getIndex(), this.game)

    if (attackerCardDescription.hasOmnistrike()) {
      const northOpponents = this.getOpponentsInDirection(attacker, opponentsCards, { y: -1 })
      const southOpponents = this.getOpponentsInDirection(attacker, opponentsCards, { y: 1 })
      const westOpponents = this.getOpponentsInDirection(attacker, opponentsCards, { x: -1 })
      const eastOpponents = this.getOpponentsInDirection(attacker, opponentsCards, { x: 1 })
      return uniq([...northOpponents, ...southOpponents, ...westOpponents, ...eastOpponents])
    }

    const delta = {
      x: opponentCard.location.x! - attackerCard.location.x!,
      y: opponentCard.location.y! - attackerCard.location.y!
    }

    return this.getOpponentsInDirection(attacker, opponentsCards, delta)
  }

  getAttackValue(attack: number, attacker: Material, opponent: Material): number {
    const attackerCard = attacker.getItem()!
    const opponentCard = opponent.getItem()!
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
