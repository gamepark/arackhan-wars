/** @jsxImportSource @emotion/react */
import { Picture, useRules } from '@gamepark/react-game'
import { getCardBattlefieldModifierLocations } from './FactionCardDescription'
import { Trans, useTranslation } from 'react-i18next'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { alignIcon } from './AttributeHelp'
import { Location } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { attributesIconDescription } from '../locators/AttributesIconsLocator'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { CombatIcon, combatIconDescription } from '../locators/CombatIconLocator'
import { skillLostIconDescription } from '../locators/SkillLostIconLocator'

export const CardEffectsHelp = ({ index }: { index: number }) => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()!
  const locations = getCardBattlefieldModifierLocations(rules.game, index)
  if (!locations.length) return null
  return <>
    <hr/>
    <h4>{t('rules.card.effects')}</h4>
    {locations.map(location =>
      <p key={JSON.stringify(location)} css={alignIcon}>
        <Picture src={getEffectImage(location)}/>
        <span>{getEffectText(location, t)}</span>
      </p>
    )}
    <hr/>
  </>
}

const getEffectImage = (location: Location) => {
  switch (location.type) {
    case LocationType.AttributesIcons:
      return attributesIconDescription.getImage(location)
    case LocationType.CombatIcon:
      return combatIconDescription.images[location.id]
    case LocationType.SkillLostIcon:
      return skillLostIconDescription.image
  }
}

const getEffectText = (location: Location, t: TFunction) => {
  switch (location.type) {
    case LocationType.AttributesIcons:
      const attribute = t(`attribute.${location.id.type}`, location.id)
      return <Trans defaults={location.id.cancel ? 'rules.card.attribute.lost' : 'rules.card.attribute.gain'} values={{ attribute }}><strong/></Trans>
    case LocationType.CombatIcon:
      return <strong>{t(`rules.card.${location.id === CombatIcon.Attack ? 'attack' : 'defense'}.${location.y! > 0 ? 'gain' : 'lost'}`, { modifier: location.y })}</strong>
    case LocationType.SkillLostIcon:
      return <span>{t(`rules.card.skills-lost`)}</span>
    default:
      return null
  }
}
