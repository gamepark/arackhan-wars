import { Effect, PassiveEffect } from '../../descriptions/base/Effect'
import { MaterialGame } from '@gamepark/rules-api/dist/material/MaterialGame'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'

// TODO: How to typeguard ? on looseSkill ?
class LooseSkillsEffect extends PassiveEffect {
  looseSkill = true

  constructor(game: MaterialGame) {
    super(game)
  }
}

export const looseSkills = (filters: ApplicableFilter[]) => new class extends Effect {

  constructor() {
    super(filters)
  }

  getEffectRule(game: MaterialGame) {
    return new LooseSkillsEffect(game)
  }

}

export const isLooseSkillEffect = (effect: PassiveEffect): effect is LooseSkillsEffect => typeof (effect as any).looseSkill === 'boolean'
