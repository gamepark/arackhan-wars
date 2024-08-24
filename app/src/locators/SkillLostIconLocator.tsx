/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationDescription, Locator } from '@gamepark/react-game'
import skillCancelEn from '../images/icons/en/skill-cancel-en.png'
import skillCancelFr from '../images/icons/fr/skill-cancel-fr.png'

const locale = new URLSearchParams(window.location.search).get('locale') ?? 'en'
const icon = locale === 'fr' ? skillCancelFr : skillCancelEn

export class SkillLostIconLocator extends Locator {
  locationDescription = skillLostIconDescription
  parentItemType = MaterialType.FactionCard
  positionOnParent = { x: 75, y: 87 }
}

export class SkillLostIconDescription extends LocationDescription {
  width = 1.5
  height = 0.98
  image = icon
}

export const skillLostIconDescription = new SkillLostIconDescription()
