import { pointerWithin } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { useMe } from '@gamepark/react-client'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { AltCardsLock } from './AltCardsLock'
import DeckbuildingFilters from './DeckbuildingFilters'
import { DeckStats } from './DeckStats'
import { Pagination } from './Pagination'

export default function DeckbuildingGameDisplay() {
  const isSubscriber = !!useMe()?.user?.subscriptionSince
  return <>
    <GameTable xMin={-4} xMax={86} yMin={-5} yMax={35} collisionAlgorithm={pointerWithin}>
      <GameTableNavigation css={navigationCss}/>
      <DeckbuildingFilters/>
      <Pagination/>
      <DeckStats/>
      {!isSubscriber && <AltCardsLock/>}
    </GameTable>
  </>
}

const navigationCss = css`
  left: 2em;
  right: auto;
  top: auto;
  bottom: 2em;
`
