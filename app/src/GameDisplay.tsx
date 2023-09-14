/** @jsxImportSource @emotion/react */
import { GameTable } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'
import { pointerWithin } from '@dnd-kit/core'
import AttacksDisplay from './AttacksDisplay'

export default function GameDisplay() {
  return <>
    <GameTable xMin={-29} xMax={73} yMin={-29} yMax={29} collisionAlgorithm={pointerWithin}>
      <AttacksDisplay/>
    </GameTable>
    <PlayerPanels/>
  </>
}
