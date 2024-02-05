/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Faction } from '@gamepark/arackhan-wars/material/Faction'
import { usePlay, useRules } from '@gamepark/react-game'
import { factionTokenDescription } from '../material/FactionTokenDescription'
import { DeckbuildingFilter } from './DeckbuildingFilter'
import { DeckbuildingRules } from './DeckbuildingRules'

export default function DeckbuildingFilters() {
  const rules = useRules<DeckbuildingRules>()
  const play = usePlay()
  return <div css={filters}>
    <div css={[factionButton(Faction.Whitelands), rules?.remind(DeckbuildingFilter.Whitelands) || inactive]}
         onClick={() => play(rules!.changeFilter(DeckbuildingFilter.Whitelands))}/>
    <div css={[factionButton(Faction.Nakka), rules?.remind(DeckbuildingFilter.Nakka) || inactive]}
         onClick={() => play(rules!.changeFilter(DeckbuildingFilter.Nakka))}/>
    <div css={[factionButton(Faction.GreyOrder), rules?.remind(DeckbuildingFilter.GreyOrder) || inactive]}
         onClick={() => play(rules!.changeFilter(DeckbuildingFilter.GreyOrder))}/>
    <div css={[factionButton(Faction.Blight), rules?.remind(DeckbuildingFilter.Blight) || inactive]}
         onClick={() => play(rules!.changeFilter(DeckbuildingFilter.Blight))}/>
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

const factionButton = (faction: Faction) => css`
  border-radius: 50%;
  box-shadow: 0 0 0.5em black, 0 0 0.5em black;
  width: 3em;
  height: 3em;
  background-image: url("${factionTokenDescription.images[faction]}");
  background-size: cover;
  cursor: pointer;
`

const inactive = css`
  filter: brightness(0.5);
`
