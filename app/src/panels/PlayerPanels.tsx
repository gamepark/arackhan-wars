/** @jsxImportSource @emotion/react */
import { FC } from 'react';
import { usePlayerId, usePlayers } from '@gamepark/react-game';
import { css } from '@emotion/react';
import { ArackhanPlayerPanel } from './ArackhanPlayerPanel';

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  const isSpectator = usePlayerId() === undefined
  return (
    <>
      {players.map((player, index) =>
        <ArackhanPlayerPanel key={player.id} player={player.id}
                     css={panelPosition(index, players.length, isSpectator)}>
        </ArackhanPlayerPanel>
      )}
    </>
  )
}

const panelPosition = (index: number, players: number, isSpectator: boolean) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + (isSpectator ? index : (index || players) - 1) * 76.5 / (players - 1)}em;
  width: 28em;
  height: 14em;
`

