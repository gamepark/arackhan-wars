/** @jsxImportSource @emotion/react */
import { pointerWithin } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'

export default function DeckbuildingGameDisplay() {
  return <>
    <GameTable xMin={-4} xMax={86} yMin={-5} yMax={35} collisionAlgorithm={pointerWithin} css={css`border: 1px solid white`}>
      <GameTableNavigation css={navigationCss}/>
    </GameTable>
  </>
}

const navigationCss = css`
  left: auto;
  right: 2em;
  top: 50.5em;
`
