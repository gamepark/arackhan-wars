/** @jsxImportSource @emotion/react */
import { Attribute } from '@gamepark/arackhan-wars/material/cards/Attribute'
import { Picture } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { css } from '@emotion/react'
import { attributesIconDescription } from '../locators/AttributesIconsLocator'

export const AttributeRule = ({ attribute }: { attribute: Attribute }) => {
  return <p css={alignIcon}>
    <Picture src={attributesIconDescription.attributeImages[attribute.type]}/>
    &nbsp;
    <span><Trans defaults={`rules.attribute.${attribute.type}`} values={attribute}><strong/></Trans></span>
  </p>
}

const alignIcon = css`
  * {
    vertical-align: middle;
  }

  picture, img {
    height: 1.5em;
  }
`
