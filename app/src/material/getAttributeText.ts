import { Attribute, AttributeType } from '@gamepark/arackhan-wars/material/cards/Attribute'
import { TFunction } from 'i18next'

export function getAttributeText(attribute: Attribute, t: TFunction) {
  let text = t(`attribute.${attribute.type}`)
  if (attribute.type === AttributeType.Movement || attribute.type === AttributeType.RangedAttack) {
    text += ' ' + attribute.distance
  }
  return text
}
