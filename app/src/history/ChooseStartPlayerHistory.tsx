/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { MoveComponentProps, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const ChooseStartPlayerHistory = ({ move, context }: MoveComponentProps) => {
  const { t } = useTranslation()
  const player = context.action.playerId
  const chosenPlayer = move.data
  const playerName = usePlayerName(player)
  const chosenPlayerName = usePlayerName(chosenPlayer)
  const rules = useRules<ArackhanWarsRules>()
  if (!rules) return null
  if (player === chosenPlayer) {
    return <>{t('history.start.self', { player: playerName })}</>
  } else {
    return <>{t('history.start.opponent', { player: playerName, opponent: chosenPlayerName })}</>
  }
}
