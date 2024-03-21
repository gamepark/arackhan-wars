/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { FactionTokenBackground } from './RevealCardHistory'

type ChooseDeckHistoryProps = {
  player: number
  chosenPlayer: number
}

export const ChooseStartPlayerHistory = ({ player, chosenPlayer }: ChooseDeckHistoryProps) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(player)
  const chosenPlayerName = usePlayerName(chosenPlayer)
  const rules = useRules<ArackhanWarsRules>()
  if (!rules) return null
  return <HistoryEntry player={player} backgroundColor={FactionTokenBackground[rules.remind(Memory.PlayerFactionToken, player)]}>
    {player === chosenPlayer ?
      t('history.start.self', { player: playerName })
      : t('history.start.opponent', { player: playerName, opponent: chosenPlayerName })
    }
  </HistoryEntry>
}
