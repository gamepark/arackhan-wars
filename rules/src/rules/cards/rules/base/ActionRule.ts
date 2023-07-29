import { Material, MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { FactionCardInspector } from '../helper/FactionCardInspector'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { RuleId } from '../../../RuleId'
import { CardAttributeType } from '../../descriptions/base/FactionCardDetail'
import { isSpell } from '../../descriptions/base/Spell'
import { CustomMoveType } from '../../../../material/CustomMoveType'

export class ActionRule extends PlayerTurnRule {
  private readonly cardInspector: FactionCardInspector

  constructor(game: MaterialGame,
              cardInspector?: FactionCardInspector) {
    super(game)
    this.cardInspector = cardInspector ?? new FactionCardInspector(game)
  }


  getPlayerMoves(): MaterialMove[] {
    const playerCard = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(this.player)

    const moves = []
    for (const cardIndex of playerCard.getIndexes()) {
      const cardMaterial = playerCard.index(cardIndex)
      if (!this.isActive(cardMaterial)) continue
      const card = cardMaterial.getItem()!
      const cardDescription = getFactionCardDescription(card.id.front)
      if (cardDescription.action) {
        moves.push(this.rules().customMove(CustomMoveType.CardAction, { card: cardIndex, action: cardDescription.action }))
      }
    }

    return moves
  }

  isActive(cardMaterial: Material): boolean {
    // Spell is always considered activable
    const card = cardMaterial.getItem()!
    const cardDescription = getFactionCardDescription(card.id.front)

    const isInitiativeRule = this.game.rule!.id === RuleId.InitiativeActivationRule
    if (isInitiativeRule && (!cardDescription.hasInitiative() || this.cardInspector.hasLostAttributes(cardMaterial.getIndex(), CardAttributeType.Initiative))) return false
    if (isSpell(cardDescription)) return true

    // Other cards are activable if there is a non returned token on it
    return !!this
      .material(MaterialType.FactionToken)
      .parent(cardMaterial.getIndex())
      .rotation((rotation) => !rotation?.y)
      .length
  }
}
