import { MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../../../material/MaterialType'
import { getCharacteristics } from '../../../../material/FactionCard'
import { FactionCardInspector } from '../helper/FactionCardInspector'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { RuleId } from '../../../RuleId'
import { CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { isSpell } from '../../descriptions/base/Spell'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { ActivationPhaseRule } from '../../../ActivationPhaseRule'

export class ActionRule extends ActivationPhaseRule {
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
      if (!this.isActive(cardIndex)) continue
      const characteristics = getCharacteristics(cardIndex, this.game)
      if (characteristics.action) {
        moves.push(this.rules().customMove(CustomMoveType.CardAction, { card: cardIndex, action: characteristics.action }))
      }
    }

    return moves
  }

  isActive(cardIndex: number): boolean {
    // Spell is always considered activable
    const characteristics = getCharacteristics(cardIndex, this.game)

    const isInitiativeRule = this.game.rule!.id === RuleId.InitiativeActivationRule
    if (isInitiativeRule && (!characteristics.hasInitiative() || this.cardInspector.hasLostAttributes(cardIndex, CardAttributeType.Initiative))) return false
    if (isSpell(characteristics)) return true

    // Other cards are activable if there is a non returned token on it
    return !!this
      .material(MaterialType.FactionToken)
      .parent(cardIndex)
      .rotation((rotation) => !rotation?.y)
      .length
  }
}
