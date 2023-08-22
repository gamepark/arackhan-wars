/** @jsxImportSource @emotion/react */
import { GameTable } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'
import { pointerWithin } from '@dnd-kit/core'
import background from './images/background.jpg'

export default function GameDisplay() {
  return <>
    <GameTable xMin={-29} xMax={73} yMin={-29} yMax={29} collisionAlgorithm={pointerWithin} background={background} backgroundOverlay="rgba(0, 0, 0, 0.3)"/>
    <PlayerPanels/>
  </>
}
