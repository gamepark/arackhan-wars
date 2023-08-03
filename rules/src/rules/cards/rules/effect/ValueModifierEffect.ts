import { Ability, EffectRule } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { AttackEffect } from '../../descriptions/base/AttackEffect'
import { Effect, EffectType } from '../../descriptions/base/Effect'


export type CardValues = { attack?: number, defense?: number }

export class ValueModifierEffect extends AttackEffect {

  constructor(game: MaterialGame, readonly values: CardValues) {
    super(game)
  }

  getBonus(): { attack: number, defense: number } {
    return {
      attack: this.values?.attack ?? 0,
      defense: this.values?.defense ?? 0
    }
  }
}

export const valueModifier = (filters: ApplicableFilter[], values: CardValues): Ability => {
  const effects: Effect[] = []
  if (values.attack) effects.push({ type: EffectType.AddAttack, value: values.attack })
  if (values.defense) effects.push({ type: EffectType.AddDefense, value: values.defense })
  return new class extends Ability {
    constructor() {
      super(filters)
    }

    effects = effects

    getEffectRule(game: MaterialGame) {
      return new ValueModifierEffect(game, values)
    }
  }
}

export const isValueModifierEffect = (effect: EffectRule): effect is ValueModifierEffect => typeof (effect as any).getBonus === 'function'
