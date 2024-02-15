/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Attribute } from '@gamepark/arackhan-wars/material/cards/Attribute'
import { Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { attributesIconDescription } from '../locators/AttributesIconsLocator'

export const AttributeHelp = ({ attribute }: { attribute: Attribute }) => {
  const { t } = useTranslation()
  return <p css={alignIcon}>
    <Picture src={attributesIconDescription.attributeImages[attribute.type]}/>
    <strong>{t(`attribute.${attribute.type}`, attribute)}</strong>
    <span> - <Trans defaults={`rules.attribute.${attribute.type}`} values={attribute}><strong/></Trans></span>
  </p>
}

export const alignIcon = css`
  > * {
    vertical-align: middle;
  }

  picture, img {
    vertical-align: middle;
    height: 1.5em;
    margin-right: 0.1em;
  }
`
