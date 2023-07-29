import { Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Attribute, AttributeKind } from './Attribute'
import { CardAttributeType } from '../../descriptions/base/FactionCardDetail'
import { AttackAttributeRule } from './AttackAttribute'
import { MaterialType } from '../../../../material/MaterialType'
import { getFactionCardDescription } from '../../../../material/FactionCard'
import { onBattlefieldAndAstralPlane } from '../../../../utils/LocationUtils'
import { ValueModifierEffect } from '../effect/ValueModifierEffect'
import { PassiveEffect } from '../../descriptions/base/Effect'
import { isCreature } from '../../descriptions/base/Creature'

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
    const sourceFamily = isCreature(sourceCardDescription) ? sourceCardDescription.family : undefined
    const targetCardDescription = getFactionCardDescription(targetCard.id.front)
    const targetFamily = isCreature(targetCardDescription) ? targetCardDescription.family : undefined

    const cardsWithSameFamily = this.material(MaterialType.FactionCard)
      .location(onBattlefieldAndAstralPlane)
      .player(sourceCard.location.player)
      .filter(item => {
        const details = getFactionCardDescription(item.id.front)
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
