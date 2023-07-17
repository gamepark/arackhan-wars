import { EffectRule } from '../base/EffectRule'
import { CardAttributeType } from '../../descriptions/FactionCardDetail'

export class SnowGriffinEffectRule extends EffectRule {
  isApplicable(isAlly: boolean): boolean {
    return !isAlly
  }

  getLostAttributes(): CardAttributeType[] {
    return [CardAttributeType.Swarm]
  }
}
