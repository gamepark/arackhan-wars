/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { usePlay, useRules } from '@gamepark/react-game'
import creature from '../images/icons/creature.png'
import land from '../images/icons/land.png'
import spell from '../images/icons/spell.png'
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
  </div>
}

const filters = css`
  position: absolute;
  top: 1em;
  left: 1em;
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: repeat(10, 1fr);
`

const filterButton = css`
  width: 3em;
  height: 3em;
  background-size: cover;
  cursor: pointer;
`

const factionButton = (faction: Faction) => css`
  border-radius: 50%;
  box-shadow: 0 0 0.5em black, 0 0 0.5em black;
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

const inactive = css`
  filter: brightness(0.5);
`
