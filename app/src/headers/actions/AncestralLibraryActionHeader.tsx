/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const AncestralLibraryActionHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const count = rules.remind(Memory.Count)
  if (playerId === activePlayer) {
    return <>{t('ancestral-library.you', { count })}</>
  } else {
    return <>{t('ancestral-library.player', { count, player })}</>
  }
}
