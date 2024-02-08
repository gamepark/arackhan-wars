/** @jsxImportSource @emotion/react */
import { pointerWithin } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import DeckbuildingFilters from './DeckbuildingFilters'
import { DeckStats } from './DeckStats'
import { Pagination } from './Pagination'

export default function DeckbuildingGameDisplay() {
  return <>
    <GameTable xMin={-4} xMax={86} yMin={-5} yMax={35} collisionAlgorithm={pointerWithin} css={css`border: 1px solid white`}>
      <GameTableNavigation css={navigationCss}/>
      <DeckbuildingFilters/>
      <Pagination/>
      <DeckStats/>
    </GameTable>
  </>
}

const navigationCss = css`
  left: 2em;
  right: auto;
  top: auto;
  bottom: 2em;
`
