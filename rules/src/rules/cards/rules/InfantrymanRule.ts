import { FactionCardRule } from './base/FactionCardRule'
import { InfantryManEffectRule } from './effect/InfantryManEffectRule'

export class InfantrymanRule extends FactionCardRule {
  effect() {
    return new InfantryManEffectRule(this.game, this.item, this.card, this.index)
  }
}
