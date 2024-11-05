/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { MaterialComponent, Picture, pointerCursorCss, usePlay, useRules } from '@gamepark/react-game'
import { Location, MaterialMoveBuilder } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { Trans, useTranslation } from 'react-i18next'
import { attributesIconDescription } from '../locators/AttributesIconsLocator'
import { CombatIcon, combatIconDescription } from '../locators/CombatIconLocator'
import { skillLostIconDescription } from '../locators/SkillLostIconLocator'
import { alignIcon } from './AttributeHelp'
import { getCardBattlefieldModifierLocations } from './FactionCardDescription'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const CardEffectsHelp = ({ index }: { index: number }) => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()!
  const locations = getCardBattlefieldModifierLocations(rules.game, index)
  const cardsUnder = rules.material(MaterialType.FactionCard).location(LocationType.UnderCard).parent(index)
  const play = usePlay()
  if (!locations.length) return null
  return <>
    {cardsUnder.length > 0 &&
      <>
        <hr/>
        <h4>{t('rules.cards-under')}</h4>
        <ol css={grid}>
          {cardsUnder.entries.map(([index, card]) =>
            <li key={index}>
              <MaterialComponent type={MaterialType.FactionCard} itemId={card.id} css={pointerCursorCss}
                                 onClick={() => play(displayMaterialHelp(MaterialType.FactionCard, card, index), { transient: true })}/>
            </li>
          )}
        </ol>
      </>
    }
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

const grid = css`
  display: grid;
  grid-template-columns: auto auto auto;
  list-style-type: none;
  gap: 1em;
  padding: 0 0.5em 0.5em 0;
  margin: 0;
  font-size: 1.4em;
`
