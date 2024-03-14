/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AttributeType, attributeTypes } from '@gamepark/arackhan-wars/material/cards/Attribute'
import { Faction, factions } from '@gamepark/arackhan-wars/material/Faction'
import { usePlay, useRules } from '@gamepark/react-game'
import astral from '../images/icons/astral.png'
import creature from '../images/icons/creature.png'
import land from '../images/icons/land.png'
import spell from '../images/icons/spell.png'
import { attributesIconDescription } from '../locators/AttributesIconsLocator'
import { factionTokenDescription } from '../material/FactionTokenDescription'
import { CardType, cardTypes, DeckbuildingFilter } from './DeckbuildingFilter'
import { DeckbuildingRules } from './DeckbuildingRules'

export default function DeckbuildingFilters() {
  const rules = useRules<DeckbuildingRules>()
  const play = usePlay()
  return <div css={filters}>
    {factions.map(faction => {
      const inactive = rules?.remind(DeckbuildingFilter.Faction) !== faction
      return <div key={faction}
                  css={[filterButton, factionButton(faction), inactive && inactiveCss]}
                  onClick={() => play(rules!.changeFilter(DeckbuildingFilter.Faction, inactive ? faction : undefined))}/>
    })}
    {cardTypes.map(cardType => {
      const inactive = rules?.remind(DeckbuildingFilter.CardType) !== cardType
      return <div key={cardType}
                  css={[filterButton, cardTypeButton(cardType), inactive && inactiveCss]}
                  onClick={() => play(rules!.changeFilter(DeckbuildingFilter.CardType, inactive ? cardType : undefined))}/>
    })}
    <div/>
    {attributeTypes.map(attributeType => {
      const inactive = rules?.remind(DeckbuildingFilter.Attribute) !== attributeType
      return <div key={attributeType}
                  css={[filterButton, attributeButton(attributeType), inactive && inactiveCss]}
                  onClick={() => play(rules!.changeFilter(DeckbuildingFilter.Attribute, inactive ? attributeType : undefined))}/>
    })}
  </div>
}

const filters = css`
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: repeat(9, 1fr);
`

const filterButton = css`
  filter: drop-shadow(0 0 0.5em black);
  width: 3em;
  height: 3em;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`

const factionButton = (faction: Faction) => css`
  border-radius: 50%;
  background-image: url("${factionTokenDescription.images[faction]}");
`

const cardTypeButton = (cardType: CardType) => css`
  background-image: url("${cardTypeIcon[cardType]}");
`

const cardTypeIcon: Record<CardType, string> = {
  [CardType.Creature]: creature,
  [CardType.Land]: land,
  [CardType.Spell]: spell,
  [CardType.Astral]: astral
}

const attributeButton = (attributeType: AttributeType) => css`
  border-radius: 50%;
  background-image: url("${attributesIconDescription.attributeImages[attributeType]}");
`

const inactiveCss = css`
  filter: drop-shadow(0 0 0.5em black) brightness(0.5);
`
