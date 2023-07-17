import { FactionCardRule } from './base/FactionCardRule'
import { SnowGriffinEffectRule } from './effect/SnowGriffinEffectRule'

export class SnowGriffinRule extends FactionCardRule {
  effect() {
    return new SnowGriffinEffectRule(this.game, this.item, this.card, this.index)
  }
}
