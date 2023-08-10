/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next';
import { MaterialRulesProps } from '@gamepark/react-game/dist/components/material/MaterialDescription';

export const FactionTokenRules = (props: MaterialRulesProps) => {
  const { item } = props;
  const { t } = useTranslation()
  const flipped = item.rotation?.y === 1
  return <>
    <h2>{t('rules.faction-token.title')}</h2>
    <p>{t('rules.faction-token.purpose')}</p>
    {flipped && <p><Trans defaults='rules.faction-token.flipped'><strong /></Trans></p> }
  </>
}
