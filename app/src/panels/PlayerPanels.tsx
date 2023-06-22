/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { PlayerPanel, usePlayerId, usePlayers } from '@gamepark/react-game'
import { css } from '@emotion/react'
import { getPlayerName } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { useTranslation } from 'react-i18next'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  const isSpectator = usePlayerId() === undefined
  const { t } = useTranslation()
  return (
    <>
      {players.map((player, index) =>
        <PlayerPanel key={player.id} playerId={player.id} color={stringToColour(player.name ?? getPlayerName(player.id, t))}
                     css={panelPosition(index, players.length, isSpectator)}/>
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

const stringToColour = function (str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

