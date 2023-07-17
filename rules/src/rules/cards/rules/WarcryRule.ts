import { FactionCardRule } from './base/FactionCardRule'
import { WarcryEffectRule } from './effect/WarcryEffectRule'

export class WarcryRule extends FactionCardRule {

  effect() {
    return new WarcryEffectRule(this.game, this.item, this.card, this.index)
  }

  onRoundEnd() {
    return this.discardCard()
  }
}
