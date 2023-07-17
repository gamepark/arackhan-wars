import { FactionCardRule } from './base/FactionCardRule'
import { TreeOfLifeEffectRule } from './effect/TreeOfLifeEffectRule'

export class TreeOfLifeRule extends FactionCardRule {
  effect() {
    return new TreeOfLifeEffectRule(this.game, this.item, this.card, this.index)
  }
}
