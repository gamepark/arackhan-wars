import { Ability, EffectRule } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'
import { EffectType, LoseSkills } from '../../descriptions/base/Effect'

export class LooseSkillsEffect extends EffectRule {
  looseSkill = true

  constructor(game: MaterialGame) {
    super(game)
  }
}

export const looseSkills = (filters: ApplicableFilter[]) => new class extends Ability {

  constructor() {
    super(filters)
  }

  effect: LoseSkills = { type: EffectType.LoseSkills }

  getEffectRule(game: MaterialGame) {
    return new LooseSkillsEffect(game)
  }

}

export const isLooseSkillEffect = (effect: EffectRule): effect is LooseSkillsEffect => typeof (effect as any).looseSkill === 'boolean'
