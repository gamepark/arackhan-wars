import { CustomMoveType } from '../../../../material/CustomMoveType'
import { Material, MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { FactionCardDetail, FactionCardKind } from '../../descriptions/FactionCardDetail'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { getFactionCardDescription, getFactionCardRule } from '../../../../material/FactionCard'
import { getDistance } from '../../../../utils/IsAdjacent'

export class AttackRules extends MaterialRulesPart {
  readonly card: FactionCardDetail
  readonly item: Material
  readonly index: number

  constructor(game: MaterialGame, item: Material, card: FactionCardDetail, index: number) {
    super(game)
    this.item = item
    this.card = card
    this.index = index
  }

  getPossibleAttacks(opponentsCards: Material): MaterialMove[] {
    if (!this.canAttack()) return []
    return opponentsCards.getIndexes()
      // Asking the card rule if it can attack the opponent
      .filter((index: number) => this.canAttackTheOpponent(opponentsCards.getItem(index)!))

      // Convert attacks to custom moves
      .map((index: number) => this.rules().customMove(CustomMoveType.Attack, { card: this.index, targets: [index] }))
  }


  canAttack() {
    return this.card.canAttack()
  }

  // TODO: Add other card on battlefield (in case of effect that block the attack, or if they ad bonuses to this card)
  canAttackTheOpponent(opponent: MaterialItem<PlayerId, LocationType>): boolean {
    const attacker = this.item.getItem()!
    const distance = getDistance(
      { x: attacker.location.x!, y: attacker.location.y! },
      { x: opponent.location.x!, y: opponent.location.y! }
    )

    // Range attack
    const rangeAttack = this.card.getRangeAttack()
    if (rangeAttack?.strength) return distance > 0 && distance <= rangeAttack.strength

    return distance === 1
  }

  attack(opponents: number[], _cardsInBattlefield: MaterialItem[]): MaterialMove[] {
    const moves = []
    let destroyedOpponents = 0
    for (const index of opponents) {
      const opponentItem = this.material(MaterialType.FactionCard).index(index).getItem()!
      const opponentCard = getFactionCardDescription(opponentItem.id.front)
      if (opponentCard.defense! < this.card.attack!) {
        destroyedOpponents++
        moves.push(...getFactionCardRule(this.game, index).discardCard())
      }
    }

    moves.push(...this.afterAttack(opponents, destroyedOpponents))

    if (this.card.kind === FactionCardKind.Spell) return moves
    return moves
  }

  afterAttack(_opponents: number[], _destroyedOpponents: number): MaterialMove[] {
    return []
  }
}
