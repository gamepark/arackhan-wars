import { FactionCardRule } from './base/FactionCardRule'
import { CardAttributeType } from '../descriptions/FactionCardDetail'

export class TreeOfLifeRule extends FactionCardRule {
  isEffectApplicable(_cardIndex: number, isAlly: boolean): boolean {
    return isAlly
  }

  getExtraAttributes(_cardIndex: number, _isAlly: boolean): CardAttributeType[] {
    return [CardAttributeType.Regeneration]
  }
}
