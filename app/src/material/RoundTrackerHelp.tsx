/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { useRules } from '@gamepark/react-game'

export const RoundTrackerHelp = () => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()!
  return <>
    <h2>{t('rules.round-track.title')}</h2>
    <p><strong>{t('rules.round-track.round', { round: rules.round })}</strong></p>
    <p>{t('rules.round-track.purpose')}</p>
  </>
}
