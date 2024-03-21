/** @jsxImportSource @emotion/react */
import { HistoryEntry } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

type NewRoundHistoryProps = {
  round: number
}

export const NewRoundHistory = ({ round }: NewRoundHistoryProps) => {
  const { t } = useTranslation()
  return <HistoryEntry borderTop>
    {t('history.round', { round })}
  </HistoryEntry>
}
