/** @jsxImportSource @emotion/react */
import { pointerWithin } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import AttacksDisplay from './AttacksDisplay'
import { PlayerPanels } from './panels/PlayerPanels'

export default function GameDisplay() {
  return <>
    <GameTable xMin={-29} xMax={73} yMin={-29} yMax={29} collisionAlgorithm={pointerWithin}>
      <AttacksDisplay/>
      <GameTableNavigation css={navigationCss}/>
    </GameTable>
    <PlayerPanels/>
  </>
}

const navigationCss = css`
  left: auto;
  right: 2em;
  top: 50.5em;
`
