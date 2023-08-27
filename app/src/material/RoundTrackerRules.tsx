/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'

export const RoundTrackerRules = () => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()!
  const tracker = rules.material(MaterialType.RoundTrackerToken).getItem()!
  return <>
    <h2>{t('rules.round-track.title')}</h2>
    <p><strong>{t('rules.round-track.round', { round: tracker.location.x })}</strong></p>
    <p>{t('rules.round-track.purpose')}</p>
  </>
}
