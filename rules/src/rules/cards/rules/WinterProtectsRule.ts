import { FactionCardRule } from './base/FactionCardRule'
import { WinterProtectEffectRule } from './effect/WinterProtectEffectRule'

export class WinterProtectsRule extends FactionCardRule {
  effect() {
    return new WinterProtectEffectRule(this.game, this.item, this.card, this.index)
  }

  onRoundEnd() {
    return this.discardCard()
  }
}
