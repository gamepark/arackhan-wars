/** @jsxImportSource @emotion/react */
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, usePlayerName } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useTranslation } from 'react-i18next'
import { FactionTokenBackground } from './RevealCardHistory'

type StartActivationHistoryProps = {
  game: MaterialGame
  player: number
  initiative?: boolean
}

export const StartActivationHistory = ({ game, player, initiative }: StartActivationHistoryProps) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(player)
  return <HistoryEntry player={player} backgroundColor={FactionTokenBackground[game.memory[Memory.PlayerFactionToken][player]]} borderTop>
    {t(`history.activation${initiative ? '.initiative' : ''}`, { player: playerName })}
  </HistoryEntry>
}
