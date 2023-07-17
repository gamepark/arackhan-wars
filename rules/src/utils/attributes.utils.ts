import { CardModification } from '../rules/cards/rules/base/EffectRule'
import { CardAttributeType } from '../rules/cards/descriptions/FactionCardDetail'

export const hasLostAttribute = (attribute: CardAttributeType, modification?: CardModification) => {
  if (!modification) return false
  if (modification.looseAllAttributes) return true
  return !!(modification.lostAttributes?.length && modification.lostAttributes.includes(attribute))


}
