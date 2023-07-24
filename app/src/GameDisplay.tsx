/** @jsxImportSource @emotion/react */
import { GameTable } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'
import { pointerWithin } from '@dnd-kit/core'

export default function GameDisplay() {
  return <>
    <GameTable xMin={-40} xMax={33} yMin={-34} yMax={33} zoomMin={1.35} zoomMax={6} margin={{ top: 7, left: 30, right: 30, bottom: 0 }}
               collisionAlgorithm={pointerWithin}/>
    <PlayerPanels/>
  </>
}
