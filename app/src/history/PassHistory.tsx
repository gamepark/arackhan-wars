/** @jsxImportSource @emotion/react */
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import { FactionTokenBackground } from './RevealCardHistory'

type PassHistoryProps = {
  game: MaterialGame
  player: number
}

export const PassHistory = ({ game, player }: PassHistoryProps) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(player)
  return <HistoryEntry backgroundColor={FactionTokenBackground[game.memory[Memory.PlayerFactionToken][player]]} depth={1}>
    {t('history.pass', { player: playerName })}
  </HistoryEntry>
}
