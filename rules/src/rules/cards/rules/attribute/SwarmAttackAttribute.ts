import { Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttribute, CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { AttackAttributeRule } from './AttackAttribute'
import { MaterialType } from '../../../../material/MaterialType'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { ValueModifierEffect } from '../effect/ValueModifierEffect'
import { EffectRule } from '../../descriptions/base/Ability'
import { isCreature } from '../../descriptions/base/Creature'
import { getCardRule } from '../base/CardRule'

class SwarmAttackAttribute extends AttackAttributeRule {

  constructor(game: MaterialGame) {
    super(game)
  }

  getLegalAttacks(): MaterialMove[] {
    return []
  }

  getEffectRule(source: Material, target: Material): EffectRule | undefined {
    const sourceCard = source.getItem()!
    const sourceCharacteristics = getCardRule(this.game, source.getIndex()).characteristics
    const sourceFamily = isCreature(sourceCharacteristics) ? sourceCharacteristics.family : undefined
    const targetCharacteristics = getCardRule(this.game, target.getIndex()).characteristics
    const targetFamily = isCreature(targetCharacteristics) ? targetCharacteristics.family : undefined

    const cardsWithSameFamily = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(sourceCard.location.player)
      .filter((_, index) => {
        const details = getCardRule(this.game, index).characteristics
        return isCreature(details) && details.family === sourceFamily
      })
      .length

    if (cardsWithSameFamily === 1 ?? sourceFamily !== targetFamily) return
    return new ValueModifierEffect(this.game, { attack: cardsWithSameFamily })
  }

  // TODO: how to handle +1 attack since it's not a bonus
}

export const swarm = new class extends Attribute<SwarmAttackAttribute> {
  kind = AttributeKind.Attack
  type = CardAttributeType.Swarm

  cardAttribute: CardAttribute = { type: CardAttributeType.Swarm }

  getAttributeRule(game: MaterialGame) {
    return new SwarmAttackAttribute(game)
  }

}
