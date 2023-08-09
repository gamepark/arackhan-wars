import { Ability } from '../../descriptions/base/Ability'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { Effect, EffectType } from '../../descriptions/base/Effect'


export type CardValues = { attack?: number, defense?: number }

export const valueModifier = (filters: ApplicableFilter[], values: CardValues): Ability => {
  const effects: Effect[] = []
  if (values.attack) effects.push({ type: EffectType.Attack, value: values.attack })
  if (values.defense) effects.push({ type: EffectType.Defense, value: values.defense })
  return new class extends Ability {
    constructor() {
      super(filters)
    }

    effects = effects
  }
}
