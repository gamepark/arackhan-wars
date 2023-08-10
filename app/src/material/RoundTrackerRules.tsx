/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next';
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules';
import { useRules } from '@gamepark/react-game/dist/hooks/useRules';
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType';

export const RoundTrackerRules = () => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()!
  const tracker = rules.material(MaterialType.RoundTrackerToken).getItem()!
  return <>
    <h2>{t('rules.round-tracker.title')}</h2>
    <p>{t('rules.round-tracker.purpose')}</p>
    <hr />
    <p>{t('rules.actual-round', { round: tracker.location!.x })}</p>
  </>
}
