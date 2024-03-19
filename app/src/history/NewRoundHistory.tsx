/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { HistoryEntry, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

type NewRoundHistoryProps = {
  round: number
}

export const NewRoundHistory = ({ round }: NewRoundHistoryProps) => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()
  if (!rules) return null
  return <HistoryEntry borderTop>
    {t('history.round', { round })}
  </HistoryEntry>
}
