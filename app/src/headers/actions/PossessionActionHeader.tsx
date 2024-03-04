/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const PossessionActionHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  if (playerId === activePlayer) {
    return <>{t('possession.you')}</>
  } else {
    return <>{t('possession.player', { player })}</>
  }
}
