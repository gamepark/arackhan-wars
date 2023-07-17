import { EffectRule } from '../base/EffectRule'
import { CardAttributeType } from '../../descriptions/FactionCardDetail'

export class TreeOfLifeEffectRule extends EffectRule {
  isApplicable(isAlly: boolean): boolean {
    return isAlly
  }

  getExtraAttributes(): CardAttributeType[] {
    return [CardAttributeType.Regeneration]
  }
}
