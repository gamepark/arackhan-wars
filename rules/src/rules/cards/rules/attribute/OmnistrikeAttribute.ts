import { MaterialGame } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttributeType } from '../../descriptions/base/FactionCardDetail'
import { areAdjacent } from '../../../../utils/adjacent.utils'
import { Material } from '@gamepark/rules-api/dist/material/items/Material'
import { AttackAttributeRule } from './AttackAttribute'
import { CustomMoveType } from '../../../../material/CustomMoveType'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { isSpell } from '../../descriptions/base/Spell'


export class OmnistrikeAttribute extends AttackAttributeRule {
  constructor(game: MaterialGame) {
    super(game)
  }

  getLegalAttacks(attacker: Material, opponentsCards: Material) {
    const opponents = opponentsCards.getIndexes()
      .filter((index: number) => {
        const opponentMaterial = opponentsCards.index(index)
        return areAdjacent(attacker, opponentMaterial) && !isSpell(getFactionCardDescription(opponentMaterial.getItem()!.id.front))
      })

    if (!opponents.length) return []

    return [
      this.rules().customMove(CustomMoveType.Attack, {
        card: attacker.getIndex(),
        targets: opponents
      })
    ]
  }
}

export const omnistrike = new class extends Attribute<OmnistrikeAttribute> {
  kind = AttributeKind.Attack
  type = CardAttributeType.Omnistrike

  getAttributeRule(game: MaterialGame) {
    return new OmnistrikeAttribute(game)
  }

}
