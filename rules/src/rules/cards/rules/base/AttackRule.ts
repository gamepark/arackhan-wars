import { CustomMoveType } from '../../../../material/CustomMoveType'
import { Material, MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { CardAttributeType, FactionCardDetail, FactionCardKind } from '../../descriptions/FactionCardDetail'
import { PlayerId } from '../../../../ArackhanWarsOptions'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { getFactionCardDescription, getFactionCardRule } from '../../../../material/FactionCard'
import { getDistance } from '../../../../utils/adjacent.utils'
import { CardModification } from './EffectRule'
import { ActivationRuleMemory } from '../../../types'
import { hasLostAttribute } from '../../../../utils/attributes.utils'
import { GamePlayerMemory } from '../../../../ArackhanWarsSetup'

export class AttackRule extends MaterialRulesPart {
  readonly cardDescription: FactionCardDetail
  readonly item: Material
  readonly index: number
  readonly battlefieldCards: Material

  constructor(game: MaterialGame, item: Material, cardDescription: FactionCardDetail, index: number, battlefieldCards: Material) {
    super(game)
    this.item = item
    this.cardDescription = cardDescription
    this.index = index
    this.battlefieldCards = battlefieldCards
  }

  getLegalAttacks(opponentsCards: Material, modifications: Record<number, CardModification>): MaterialMove[] {
    if (!this.canAttack()) return []
    return opponentsCards.getIndexes()
      // Asking the card rule if it can attack the opponent
      .filter((index: number) => this.canAttackTheOpponent(opponentsCards.getItem(index)!, index, modifications))

      // Convert attacks to custom moves
      .map((index: number) => this.rules().customMove(CustomMoveType.Attack, { card: this.index, targets: [index] }))
  }


  canAttack() {
    return this.cardDescription.canAttack()
  }

  canBeAttackedBy(_attackers: number[]) {
    return true
  }

  // TODO: Add other card on battlefield (in case of effect that block the attack, or if they ad bonuses to this card)
  canAttackTheOpponent(opponent: MaterialItem<PlayerId, LocationType>, opponentIndex: number, modifications: Record<number, CardModification>): boolean {
    if (modifications[opponentIndex]?.protectedFromAttacks) return false

    const attacker = this.item.getItem()!
    const distance = getDistance(
      { x: attacker.location.x!, y: attacker.location.y! },
      { x: opponent.location.x!, y: opponent.location.y! }
    )

    const cardModification = modifications[this.index]
    // Range attack
    const rangeAttack = this.cardDescription.getRangeAttack()
    const hasLostRangeAttack = hasLostAttribute(CardAttributeType.RangeAttack, cardModification)
    if (!hasLostRangeAttack && rangeAttack?.strength) return distance > 0 && distance <= rangeAttack.strength

    return distance === 1
  }

  attack(opponents: number[], modifications: Record<number, CardModification>): MaterialMove[] {
    const moves = []
    let destroyedOpponents = 0
    for (const index of opponents) {
      const opponentItem = this.material(MaterialType.FactionCard).index(index).getItem()!
      const opponentCard = getFactionCardDescription(opponentItem.id.front)


      const opponentDefense = opponentCard.defense! + (modifications[index]?.defense ?? 0)
      const cardAttack = this.computeAttack(index, modifications)

      if (opponentDefense < cardAttack) {
        destroyedOpponents++
        if (opponentCard.kind !== FactionCardKind.Land) {
          moves.push(...getFactionCardRule(this.game, index).discardCard())
        } else {
          moves.push(...this.conquerLand(index, this.index))
        }

      }
    }

    moves.push(...this.afterAttack(opponents, destroyedOpponents))

    if (this.cardDescription.kind === FactionCardKind.Spell) return moves
    return moves
  }

  conquerLand(opponentIndex: number, attackerIndex: number): MaterialMove[] {
    const attackerCard = this.material(MaterialType.FactionCard).index(attackerIndex).getItem()!
    const opponentCard = this.material(MaterialType.FactionCard).index(opponentIndex).getItem()!
    opponentCard.location.player = attackerCard.location.player

    return [
      this.material(MaterialType.FactionToken).parent(opponentIndex).deleteItem(),
      this.material(MaterialType.FactionToken).parent(opponentIndex).createItem({
        // Must be the faction instead of the player
        id: this.getGameMemory<GamePlayerMemory>(attackerCard.location.player)!.faction,
        location: { parent: opponentIndex, type: LocationType.FactionTokenSpace, player: attackerCard.location.player }
      })

    ]
  }

  computeAttack(opponentIndex: number, modifications: Record<number, CardModification>) {
    const cardAttack = Math.max(this.cardDescription.attack! + (modifications[this.index]?.attack ?? 0), 0)

    const { activatedCards = [] } = this.getMemory<ActivationRuleMemory>(this.item.getItem()!.location.player)
    const otherAttackersOnThisTarget = activatedCards.filter((c: any) => (c.targets ?? []).includes(opponentIndex))

    let groupAttack = cardAttack
    for (const otherAttacker of otherAttackersOnThisTarget) {
      const attackerItem = this.material(MaterialType.FactionCard).index(otherAttacker.card).getItem()!
      const attackerCardDescription = getFactionCardDescription(attackerItem.id.front)
      groupAttack += Math.max(attackerCardDescription.attack! + (modifications[otherAttacker.card]?.attack ?? 0))
    }

    return groupAttack
  }

  afterAttack(_opponents: number[], _destroyedOpponents: number): MaterialMove[] {
    return []
  }
}
