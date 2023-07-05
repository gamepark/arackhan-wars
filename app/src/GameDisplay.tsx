/** @jsxImportSource @emotion/react */
import { GameTable } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'
import { pointerWithin } from '@dnd-kit/core'

export default function GameDisplay() {
  return <>
    <GameTable xMin={-50} xMax={50} yMin={-35} yMax={35} zoomMin={1.4} zoomMax={6} margin={{ top: 7, left: 0, right: 20, bottom: 0 }}
               collisionAlgorithm={pointerWithin}/>
    <PlayerPanels/>
  </>
}
