import { Ability, EffectRule } from '../../descriptions/base/Ability'
import { MaterialGame } from '@gamepark/rules-api'
import { ApplicableFilter } from '../../descriptions/utils/applicable-filter.utils'

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

  getEffectRule(game: MaterialGame) {
    return new LooseSkillsEffect(game)
  }

}

export const isLooseSkillEffect = (effect: EffectRule): effect is LooseSkillsEffect => typeof (effect as any).looseSkill === 'boolean'
