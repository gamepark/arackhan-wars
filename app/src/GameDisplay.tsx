/** @jsxImportSource @emotion/react */
import { GameTable } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'
import { pointerWithin } from '@dnd-kit/core'

export default function GameDisplay() {
  return <>
    <GameTable xMin={-29} xMax={68} yMin={-29} yMax={29} zoomMin={1.6} zoomMax={6} margin={{ top: 7, left: 0, right: 30, bottom: 0 }}
               ratio={1.85} collisionAlgorithm={pointerWithin}/>
    <PlayerPanels/>
  </>
}
