import { Material, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { FactionCardDetail, FactionCardKind } from '../../descriptions/base/FactionCardDetail'
import { MaterialType } from '../../../../material/MaterialType'
import { LocationType } from '../../../../material/LocationType'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { ActivationRuleMemory } from '../../../types'
import { GamePlayerMemory } from '../../../../ArackhanWarsSetup'
import { isAttackAttribute } from '../attribute/AttackAttribute'
import { FactionCardEffectHelper } from '../helper/FactionCardEffectHelper'
import { discardCard } from '../../../../utils/discard.utils'
import { areAdjacent } from '../../../../utils/adjacent.utils'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { deactivateTokens } from '../../../../utils/activation.utils'
import { computeAttack } from '../../../../utils/attack.utils'

export class AttackRule extends MaterialRulesPart {
  constructor(game: MaterialGame,
              readonly item: Material,
              readonly cardDescription: FactionCardDetail,
              readonly index: number,
              readonly effectHelper: FactionCardEffectHelper) {
    super(game)
  }

  getLegalAttacks(opponentsCards: Material): MaterialMove[] {
    if (!this.canAttack()) return []

    const filteredOpponents = opponentsCards
      .getIndexes()
      .filter((o) => this.effectHelper.canAttack(this.index, o))

    const attributeAttacks = this.cardDescription.getAttributes()
      .filter(isAttackAttribute)
      .filter((a) => !this.effectHelper.hasLostAttributes(this.index, a.type))
      .flatMap((attribute) => attribute.getAttributeRule(this.game).getLegalAttacks(this.item, opponentsCards.indexes(filteredOpponents)))

    if (attributeAttacks.length) {
      return attributeAttacks
    }

    const moves = []
    for (const cardIndex of filteredOpponents) {
      if (!areAdjacent(this.item, opponentsCards.index(cardIndex))) continue
      moves.push(this.rules().customMove(CustomMoveType.Attack, { card: this.index, targets: [cardIndex] }))
    }

    return moves
  }

  canAttack() {
    return this.cardDescription.canAttack()
  }

  attack(opponents: number[]): MaterialMove[] {
    const moves = []
    for (const index of opponents) {
      const opponentItem = this.material(MaterialType.FactionCard).index(index)
      const opponentCard = getFactionCardDescription(opponentItem.getItem()!.id.front)

      const opponentDefense = this.effectHelper.getDefense(index)
      const { activatedCards = [] } = this.getMemory<ActivationRuleMemory>(this.item.getItem()!.location.player)
      const attackerAttack = computeAttack(this.game, this.item, opponentItem, this.effectHelper, activatedCards)
      if (opponentDefense >= attackerAttack) continue

      if (opponentCard.kind !== FactionCardKind.Land) {
        const opponentCardToken = this.material(MaterialType.FactionToken).parent(index)
        moves.push(...discardCard(opponentItem, opponentCardToken))
      } else {
        moves.push(...this.conquerLand(index, this.index))
      }
    }

    this.index === 5 && console.log('After attack', this.effectHelper.afterAttack(this.index))
    moves.push(
      ...this.effectHelper.afterAttack(this.index),
      // TODO: sometimes, there is no token (child eater)
      ...deactivateTokens(this.material(MaterialType.FactionToken).parent(this.index))
    )


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
}
