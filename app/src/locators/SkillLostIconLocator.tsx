/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { ItemLocator, LocationDescription } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { css } from '@emotion/react'
import skillCancelEn from '../images/icons/en/skill-cancel-en.png'
import skillCancelFr from '../images/icons/fr/skill-cancel-fr.png'

const locale = new URLSearchParams(window.location.search).get('locale') ?? 'en'
let icon = locale === 'fr' ? skillCancelFr : skillCancelEn

export class SkillLostIconLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new SkillLostIconDescription()
  parentItemType = MaterialType.FactionCard
  positionOnParent = { x: 25, y: 80 }
}

export class SkillLostIconDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  width = 1.5
  ratio = 287 / 187
  image = icon

  extraCss = css`
    pointer-events: none;
  `
}
