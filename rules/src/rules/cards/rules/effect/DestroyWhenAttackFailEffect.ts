import { Effect } from '../../descriptions/base/Effect'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { computeAttack } from '../../../../utils/attack.utils'
import { MaterialType } from '../../../../material/MaterialType'
import { Material } from '@gamepark/rules-api/dist/material/items/Material'
import { ActivatedCard, ActivationRuleMemory } from '../../../types'
import { FactionCardEffectHelper } from '../helper/FactionCardEffectHelper'
import { discardCard } from '../../../../utils/discard.utils'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'

class DestroyWhenAttackFailEffect extends AttackEffect {
  getAttackConsequences(attacker: Material) {
    const { activatedCards = [] } = this.getMemory<ActivationRuleMemory>(attacker.getItem()!.location.player)
    const activatedCard = activatedCards.find((a: ActivatedCard) => a.card === attacker.getIndex())!
    if (!activatedCard.targets) return []

    let destroyedOpponent = 0
    const effectHelper = new FactionCardEffectHelper(this.game)
    for (const target of activatedCard.targets) {
      const attack = computeAttack(this.game, attacker, this.material(MaterialType.FactionCard).index(target), effectHelper, activatedCards)
      const defense = effectHelper.getDefense(target)
      console.log('Target', target, defense)
      console.log('Source', attacker.getIndexes(), attack)
      if (attack > defense) destroyedOpponent++
    }

    attacker.getIndex() === 5 && console.log(destroyedOpponent, activatedCard)
    if (destroyedOpponent === activatedCard.targets.length) return []

    return discardCard(attacker, this.material(MaterialType.FactionToken).parent(attacker.getIndex()))
  }
}

export const destroyIfAttackFail = (filter: ApplicableFilter[]) => new class extends Effect {
  constructor() {
    super(filter)
  }

  getEffectRule(game: MaterialGame) {
    return new DestroyWhenAttackFailEffect(game)
  }

}
