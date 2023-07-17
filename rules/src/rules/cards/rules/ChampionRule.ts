import { FactionCardRule } from './base/FactionCardRule'
import { ChampionEffectRule } from './effect/ChampionEffectRule'

export class ChampionRule extends FactionCardRule {
  effect() {
    return new ChampionEffectRule(this.game, this.item, this.card, this.index)
  }
}
