import { RuleId } from './RuleId'
import { ActivationRule } from './ActivationRule'
import { Material } from '@gamepark/rules-api/dist/material/items/Material'
import { CardAttributeType } from './cards/descriptions/base/FactionCardDetail'
import { FactionCardEffectHelper } from './cards/rules/helper/FactionCardEffectHelper'
import { getFactionCardDescription } from '../material/FactionCard'

export class InitiativeActivationRule extends ActivationRule {
  initiative = true

  endTurnMove = () => {
    if (this.player === this.game.players[1]) {
      return this.rules().startPlayerTurn(RuleId.ActivationRule, this.nextPlayer)
    }

    return this.rules().startPlayerTurn(RuleId.InitiativeActivationRule, this.nextPlayer)
  }

  isActive(cardMaterial: Material, effectHelper: FactionCardEffectHelper): boolean {
    const card = getFactionCardDescription(cardMaterial.getItem()!.id.front)

    if (!card.hasInitiative() || effectHelper.hasLostAttributes(cardMaterial.getIndex(), CardAttributeType.Initiative)) return false
    return super.isActive(cardMaterial, effectHelper)
  }
}
