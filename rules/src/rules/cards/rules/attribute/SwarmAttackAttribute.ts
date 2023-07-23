import { Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttributeType } from '../../descriptions/base/FactionCardDetail'
import { AttackAttributeRule } from './AttackAttribute'
import { MaterialType } from '../../../../material/MaterialType'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { ValueModifierEffect } from '../effect/ValueModifierEffect'
import { PassiveEffect } from '../../descriptions/base/Effect'

class SwarmAttackAttribute extends AttackAttributeRule {

  constructor(game: MaterialGame) {
    super(game)
  }

  getLegalAttacks(): MaterialMove[] {
    return []
  }

  getPassiveEffect(source: Material, target: Material): PassiveEffect | undefined {
    const sourceCard = source.getItem()!
    const targetCard = target.getItem()!
    const sourceCardDescription = getFactionCardDescription(sourceCard.id.front)
    const targetCardDescription = getFactionCardDescription(targetCard.id.front)

    const cardsWithSameFamily = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(sourceCard.location.player)
      .filter((item) => getFactionCardDescription(item.id.front).family === sourceCardDescription.family)
      .length

    if (cardsWithSameFamily === 1 ?? sourceCardDescription.family !== targetCardDescription.family) return
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
