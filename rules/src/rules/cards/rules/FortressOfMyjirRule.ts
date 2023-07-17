import { FactionCardRule } from './base/FactionCardRule'
import { FortressOfMyjirEffectRule } from './effect/FortressOfMyjirEffectRule'

export class FortressOfMyjirRule extends FactionCardRule {
  effect() {
    return new FortressOfMyjirEffectRule(this.game, this.item, this.card, this.index)
  }
}
