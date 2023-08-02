import { Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttributeType } from '../../descriptions/base/FactionCardCharacteristics'
import { AttackAttributeRule } from './AttackAttribute'
import { MaterialType } from '../../../../material/MaterialType'
import { getCharacteristics } from '../../../../material/FactionCard'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { ValueModifierEffect } from '../effect/ValueModifierEffect'
import { EffectRule } from '../../descriptions/base/Ability'
import { isCreature } from '../../descriptions/base/Creature'

class SwarmAttackAttribute extends AttackAttributeRule {

  constructor(game: MaterialGame) {
    super(game)
  }

  getLegalAttacks(): MaterialMove[] {
    return []
  }

  getPassiveEffect(source: Material, target: Material): EffectRule | undefined {
    const sourceCard = source.getItem()!
    const sourceCharacteristics = getCharacteristics(source.getIndex(), this.game)
    const sourceFamily = isCreature(sourceCharacteristics) ? sourceCharacteristics.family : undefined
    const targetCharacteristics = getCharacteristics(target.getIndex(), this.game)
    const targetFamily = isCreature(targetCharacteristics) ? targetCharacteristics.family : undefined

    const cardsWithSameFamily = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(sourceCard.location.player)
      .filter((_, index) => {
        const details = getCharacteristics(index, this.game)
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

  getAttributeRule(game: MaterialGame) {
    return new SwarmAttackAttribute(game)
  }

}
