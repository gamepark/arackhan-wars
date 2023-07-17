import { FactionCardRule } from './base/FactionCardRule'
import { UnstableGrowthEffectRule } from './effect/UnstableGrowthEffectRule'

export class UnstableGrowthRule extends FactionCardRule {

  effect() {
    return new UnstableGrowthEffectRule(this.game, this.item, this.card, this.index)
  }

  onRoundEnd() {
    return super.discardCard()
  }
}
