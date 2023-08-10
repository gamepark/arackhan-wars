/** @jsxImportSource @emotion/react */
import { LocationRulesProps } from '@gamepark/react-game';
import { Trans, useTranslation } from 'react-i18next';

export const AstralPlaneRules = (_props: LocationRulesProps) => {
  const { t } = useTranslation()
  return <>
    <h2>{ t('rules.astral-plane.title') }</h2>
    <p>
      <Trans defaults="rules.astral-plane.purpose">
        {/* TODO: ask astral icon and place it as the <0/> child */}
      </Trans>
    </p>
    <hr />
    <p>
      <Trans defaults="rules.astral-plane.note"><strong /></Trans>
    </p>
  </>
}
