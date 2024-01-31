/** @jsxImportSource @emotion/react */
import { pointerWithin } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'

export default function DeckbuildingGameDisplay() {
  return <>
    <GameTable xMin={-29} xMax={73} yMin={-29} yMax={29} collisionAlgorithm={pointerWithin}>
      <GameTableNavigation css={navigationCss}/>
    </GameTable>
  </>
}

const navigationCss = css`
  left: auto;
  right: 2em;
  top: 50.5em;
`
