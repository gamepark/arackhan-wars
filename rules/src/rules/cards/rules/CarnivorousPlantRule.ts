import { FactionCardRule } from './base/FactionCardRule'
import { CarnivorousPlantEffectRule } from './effect/CarnivorousPlantEffectRule'
import { CarnivorousPlantAttackRule } from './attack/CarnivorousPlantAttackRule'

export class CarnivorousPlantRule extends FactionCardRule {
  effect() {
    return new CarnivorousPlantEffectRule(this.game, this.item, this.card, this.index)
  }

  attack() {
    return new CarnivorousPlantAttackRule(this.game, this.item, this.card, this.index, this.battlefieldCards)
  }
}
