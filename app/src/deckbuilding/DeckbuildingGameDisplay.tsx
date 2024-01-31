/** @jsxImportSource @emotion/react */
import { pointerWithin } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'

export default function DeckbuildingGameDisplay() {
  return <>
    <GameTable xMin={-5} xMax={40} yMin={-5} yMax={100} collisionAlgorithm={pointerWithin}>
      <GameTableNavigation css={navigationCss}/>
    </GameTable>
  </>
}

const navigationCss = css`
  left: auto;
  right: 2em;
  top: 50.5em;
`
