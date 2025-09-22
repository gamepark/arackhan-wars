import { Attribute } from '@gamepark/arackhan-wars/material/cards/Attribute'
import { Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { attributesIconDescription } from '../locators/AttributesIconsLocator'
import { alignIcon } from './help-css-util.ts'

export const AttributeHelp = ({ attribute }: { attribute: Attribute }) => {
  const { t } = useTranslation()
  return <p css={alignIcon}>
    <Picture src={attributesIconDescription.attributeImages[attribute.type]}/>
    <strong>{t(`attribute.${attribute.type}`, attribute)}</strong>
    <span> - <Trans i18nKey={`rules.attribute.${attribute.type}`} values={attribute}><strong/></Trans></span>
  </p>
}
