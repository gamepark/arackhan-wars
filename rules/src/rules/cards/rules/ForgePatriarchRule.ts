import { FactionCardRule } from './base/FactionCardRule'
import { ForgePatriarchEffectRule } from './effect/ForgePatriarchEffectRule'

export class ForgePatriarchRule extends FactionCardRule {
  effect() {
    return new ForgePatriarchEffectRule(this.game, this.item, this.card, this.index)
  }
}
