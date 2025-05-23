/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { MoveComponentProps } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const NewRoundHistory = ({ context: { game } }: MoveComponentProps) => {
  const { t } = useTranslation()
  return <>{t('history.round', { round: new ArackhanWarsRules(game).round })}</>
}
