/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { ItemLocator, LocationDescription } from '@gamepark/react-game'
import skillCancelEn from '../images/icons/en/skill-cancel-en.png'
import skillCancelFr from '../images/icons/fr/skill-cancel-fr.png'

const locale = new URLSearchParams(window.location.search).get('locale') ?? 'en'
let icon = locale === 'fr' ? skillCancelFr : skillCancelEn

export class SkillLostIconLocator extends ItemLocator {
  locationDescription = skillLostIconDescription
  parentItemType = MaterialType.FactionCard
  positionOnParent = { x: 75, y: 87 }
}

export class SkillLostIconDescription extends LocationDescription {
  width = 1.5
  ratio = 287 / 187
  image = icon

  extraCss = css`
    pointer-events: none;
  `
}

export const skillLostIconDescription = new SkillLostIconDescription()
