import { FactionCardRule } from './base/FactionCardRule'
import { HeroOfTheBattleOfNerzEffectRule } from './effect/HeroOfTheBattleOfNerzEffectRule'

export class HeroOfTheBattleOfNerzRule extends FactionCardRule {

  effect() {
    return new HeroOfTheBattleOfNerzEffectRule(this.game, this.item, this.card, this.index)
  }
}
