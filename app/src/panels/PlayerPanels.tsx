/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayers } from '@gamepark/react-game'
import { ArackhanPlayerPanel } from './ArackhanPlayerPanel'

export const PlayerPanels = () => {
  const players = usePlayers()
  const bottomPlayer = usePlayerId() ?? 1
  return (
    <>
      {players.map(player =>
        <ArackhanPlayerPanel key={player.id} player={player.id} bottom={bottomPlayer === player.id}/>
      )}
    </>
  )
}
