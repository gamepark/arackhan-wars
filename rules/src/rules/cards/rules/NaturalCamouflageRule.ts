import { FactionCardRule } from './base/FactionCardRule'
import { NaturalCamouflageEffectRule } from './effect/NaturalCamouflageEffectRule'

export class NaturalCamouflageRule extends FactionCardRule {

  effect() {
    return new NaturalCamouflageEffectRule(this.game, this.item, this.card, this.index)
  }
}
