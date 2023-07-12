import { FactionCardRule } from './base/FactionCardRule'
import { CardAttributeType } from '../descriptions/FactionCardDetail'

export class SnowGriffinRule extends FactionCardRule {

  isEffectApplicable(_cardIndex: number, isAlly: boolean): boolean {
    return !isAlly
  }

  getLostAttributes(): CardAttributeType[] {
    return [CardAttributeType.Swarm]
  }
}
