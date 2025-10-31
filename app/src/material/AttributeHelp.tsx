import { Attribute, AttributeType } from '@gamepark/arackhan-wars/material/cards/Attribute'
import { Picture } from '@gamepark/react-game'
import { TFunction } from 'i18next'
import { Trans, useTranslation } from 'react-i18next'
import { attributesIconDescription } from '../locators/AttributesIconsLocator'
import { alignIcon } from './help-css-util.ts'

export const AttributeHelp = ({ attribute }: { attribute: Attribute }) => {
  const { t } = useTranslation()
  return <p css={alignIcon}>
    <Picture src={attributesIconDescription.attributeImages[attribute.type]}/>
    <strong>{getAttributeText(attribute, t)}</strong>
    <span> - <Trans i18nKey={`rules.attribute.${attribute.type}`} values={attribute}><strong/></Trans></span>
  </p>
}

export function getAttributeText(attribute: Attribute, t: TFunction) {
  let text = t(`attribute.${attribute.type}`)
  if (attribute.type === AttributeType.Movement || attribute.type === AttributeType.RangedAttack) {
    text += ' ' + attribute.distance
  }
  return text
}
