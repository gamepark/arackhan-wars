/** @jsxImportSource @emotion/react */
import { MaterialRulesProps } from '@gamepark/react-game/dist/components/material/MaterialDescription';
import { useTranslation } from 'react-i18next';

export const RoundTrackerTokenRules = (props: MaterialRulesProps) => {
  const { item } = props;
  const { t } = useTranslation()
  return <>
    <h2>{t('rules.round-tracker-token.title')}</h2>
    <p>{t('rules.round-tracker-token.purpose')}</p>
    <hr />
    <p>{t('rules.actual-round', { round: item.location!.x })}</p>
  </>
}
