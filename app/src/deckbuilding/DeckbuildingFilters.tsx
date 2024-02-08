/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AttributeType, attributeTypes } from '@gamepark/arackhan-wars/material/cards/Attribute'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { usePlay, useRules } from '@gamepark/react-game'
import astral from '../images/icons/astral.png'
import creature from '../images/icons/creature.png'
import land from '../images/icons/land.png'
import spell from '../images/icons/spell.png'
import { attributesIconDescription } from '../locators/AttributesIconsLocator'
import { factionTokenDescription } from '../material/FactionTokenDescription'
import { DeckbuildingFilter } from './DeckbuildingFilter'
import { DeckbuildingRules } from './DeckbuildingRules'

export default function DeckbuildingFilters() {
  const rules = useRules<DeckbuildingRules>()
  const play = usePlay()
  return <div css={filters}>
    <div css={[filterButton, factionButton(Faction.Whitelands), rules?.remind(DeckbuildingFilter.Whitelands) || inactive]}
         onClick={() => play(rules!.changeFilter(DeckbuildingFilter.Whitelands))}/>
    <div css={[filterButton, factionButton(Faction.Nakka), rules?.remind(DeckbuildingFilter.Nakka) || inactive]}
         onClick={() => play(rules!.changeFilter(DeckbuildingFilter.Nakka))}/>
    <div css={[filterButton, factionButton(Faction.GreyOrder), rules?.remind(DeckbuildingFilter.GreyOrder) || inactive]}
         onClick={() => play(rules!.changeFilter(DeckbuildingFilter.GreyOrder))}/>
    <div css={[filterButton, factionButton(Faction.Blight), rules?.remind(DeckbuildingFilter.Blight) || inactive]}
         onClick={() => play(rules!.changeFilter(DeckbuildingFilter.Blight))}/>
    <div css={[filterButton, creatureButton, rules?.remind(DeckbuildingFilter.Creature) || inactive]}
         onClick={() => play(rules!.changeFilter(DeckbuildingFilter.Creature))}/>
    <div css={[filterButton, landButton, rules?.remind(DeckbuildingFilter.Land) || inactive]}
         onClick={() => play(rules!.changeFilter(DeckbuildingFilter.Land))}/>
    <div css={[filterButton, spellButton, rules?.remind(DeckbuildingFilter.Spell) || inactive]}
         onClick={() => play(rules!.changeFilter(DeckbuildingFilter.Spell))}/>
    <div css={[filterButton, astralButton, rules?.remind(DeckbuildingFilter.Astral) || inactive]}
         onClick={() => play(rules!.changeFilter(DeckbuildingFilter.Astral))}/>
    <div/>
    <div/>
    {attributeTypes.map(attributeType =>
      <div css={[filterButton, attributeButton(attributeType), rules?.remind(attributeType + 10) || inactive]}
           onClick={() => play(rules!.changeFilter(attributeType + 10))}/>
    )}
  </div>
}

const filters = css`
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: repeat(10, 1fr);
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

const creatureButton = css`
  background-image: url("${creature}");
`

const landButton = css`
  background-image: url("${land}");
`

const spellButton = css`
  background-image: url("${spell}");
`

const astralButton = css`
  background-image: url("${astral}");
`

const attributeButton = (attributeType: AttributeType) => css`
  border-radius: 50%;
  background-image: url("${attributesIconDescription.attributeImages[attributeType]}");
`

const inactive = css`
  filter: drop-shadow(0 0 0.5em black) brightness(0.5);
`
