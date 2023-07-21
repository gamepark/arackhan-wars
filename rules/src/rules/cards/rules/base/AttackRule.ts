import { Material, MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { FactionCardKind } from '../../descriptions/base/FactionCardDetail'
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
import { computeAttack } from '../../../../utils/attack.utils'
import { PlayerId } from '../../../../ArackhanWarsOptions'

export class AttackRule extends MaterialRulesPart {
  constructor(game: MaterialGame,
              readonly player: PlayerId,
              readonly effectHelper: FactionCardEffectHelper) {
    super(game)
  }

  getLegalAttacks(attacker: number, opponentsCards: Material): MaterialMove[] {
    const cardMaterial = this.material(MaterialType.FactionCard).index(attacker)
    const card = cardMaterial.getItem()!
    const cardDescription = getFactionCardDescription(card.id.front)
    if (!cardDescription.canAttack()) return []

    const filteredOpponents = opponentsCards
      .getIndexes()
      .filter((o) => this.effectHelper.canAttack(attacker, o))

    const attributeAttacks = cardDescription.getAttributes()
      .filter(isAttackAttribute)
      .filter((a) => !this.effectHelper.hasLostAttributes(attacker, a.type))
      .flatMap((attribute) => attribute.getAttributeRule(this.game).getLegalAttacks(cardMaterial, opponentsCards.indexes(filteredOpponents), this.effectHelper))

    if (attributeAttacks.length) {
      return attributeAttacks
    }

    const moves = []
    for (const cardIndex of filteredOpponents) {
      if (!areAdjacent(cardMaterial, opponentsCards.index(cardIndex))) continue
      moves.push(this.rules().customMove(CustomMoveType.Attack, { card: attacker, targets: [cardIndex] }))
    }

    return moves
  }

  attack(opponent: number): MaterialMove[] {
    const opponentMaterial = this.material(MaterialType.FactionCard).index(opponent)
    const opponentCardDescription = getFactionCardDescription(opponentMaterial.getItem()!.id.front)
    const { activatedCards = [] } = this.getMemory<ActivationRuleMemory>(this.player)

    const attacksOnThisOpponent = activatedCards.filter((a) => (a.targets ?? []).includes(opponent))
    let attackValue = 0
    const moves = []
    for (const attack of attacksOnThisOpponent) {
      const attackerCard = this.material(MaterialType.FactionCard).index(attack.card)
      attackValue += computeAttack(this.game, attackerCard, opponentMaterial, this.effectHelper, activatedCards)
    }

    const opponentDefense = this.effectHelper.getDefense(opponent)
    if (opponentDefense >= attackValue) return []

    if (opponentCardDescription.kind !== FactionCardKind.Land) {
      const opponentCardToken = this.material(MaterialType.FactionToken).parent(opponent)
      moves.push(...discardCard(opponentMaterial, opponentCardToken))
    } else {
      moves.push(...this.conquerLand(opponent))
    }


    moves.push(
      ...activatedCards.flatMap((a) => this.effectHelper.afterAttack(a.card))
    )


    return moves
  }

  conquerLand(opponentIndex: number): MaterialMove[] {
    const opponentCard = this.material(MaterialType.FactionCard).index(opponentIndex).getItem()!
    opponentCard.location.player = this.player

    return [
      this.material(MaterialType.FactionToken).parent(opponentIndex).deleteItem(),
      this.material(MaterialType.FactionToken).parent(opponentIndex).createItem({
        // Must be the faction instead of the player
        id: this.getGameMemory<GamePlayerMemory>(this.player)!.faction,
        location: { parent: opponentIndex, type: LocationType.FactionTokenSpace, player: this.player }
      })

    ]
  }
}
