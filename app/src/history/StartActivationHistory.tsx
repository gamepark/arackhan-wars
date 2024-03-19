/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { FactionTokenBackground } from './RevealCardHistory'

type StartActivationHistoryProps = {
  player: number
  initiative?: boolean
}

export const StartActivationHistory = ({ player, initiative }: StartActivationHistoryProps) => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()
  const playerName = usePlayerName(player)
  if (!rules) return null
  return <HistoryEntry player={player} backgroundColor={FactionTokenBackground[rules.remind(Memory.PlayerFactionToken, player)]} borderTop>
    {t(`history.activation${initiative ? '.initiative' : ''}`, { player: playerName })}
  </HistoryEntry>
}
