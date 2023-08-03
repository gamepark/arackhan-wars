import { Ability } from '../../descriptions/base/Ability'
import { Material, MaterialGame } from '@gamepark/rules-api'
import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { computeAttack } from '../../../../utils/attack.utils'
import { MaterialType } from '../../../../material/MaterialType'
import { ActivatedCard } from '../../../types'
import { FactionCardInspector } from '../helper/FactionCardInspector'
import { discardCard } from '../../../../utils/discard.utils'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { Memory } from '../../../Memory'
import { EffectType, Trigger, TriggerAction, TriggerCondition } from '../../descriptions/base/Effect'

export class DestroyWhenAttackFailEffect extends AttackEffect {
  getAttackConsequences(attacker: Material) {
    const activatedCards = this.remind<ActivatedCard[]>(Memory.ActivatedCards)
    const activatedCard = activatedCards.find((a: ActivatedCard) => a.card === attacker.getIndex())!
    if (!activatedCard.targets) return []

    let destroyedOpponent = 0
    const cardInspector = new FactionCardInspector(this.game)
    for (const target of activatedCard.targets) {
      const attack = computeAttack(attacker, this.material(MaterialType.FactionCard).index(target), cardInspector, activatedCards)
      const defense = cardInspector.getDefense(target)
      if (attack > defense) destroyedOpponent++
    }

    if (destroyedOpponent === activatedCard.targets.length) return []

    return discardCard(attacker, this.material(MaterialType.FactionToken).parent(attacker.getIndex()))
  }
}

export const destroyIfAttackFail = (filter: ApplicableFilter[]) => new class extends Ability {
  constructor() {
    super(filter)
  }

  effect: Trigger = { type: EffectType.Trigger, condition: TriggerCondition.FailAttack, action: TriggerAction.SelfDestroy }

  getEffectRule(game: MaterialGame) {
    return new DestroyWhenAttackFailEffect(game)
  }

}
