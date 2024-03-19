/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { FactionTokenBackground } from './RevealCardHistory'

type PassHistoryProps = {
  player: number
}

export const PassHistory = ({ player }: PassHistoryProps) => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()
  const playerName = usePlayerName(player)
  if (!rules) return null
  return <HistoryEntry backgroundColor={FactionTokenBackground[rules.remind(Memory.PlayerFactionToken, player)]} depth={1}>
    {t('history.pass', { player: playerName })}
  </HistoryEntry>
}
