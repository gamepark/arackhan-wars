/** @jsxImportSource @emotion/react */
import { Picture } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import astral from '../images/icons/astral.png'
import { alignIcon } from '../material/AttributeHelp'

export const AstralPlaneHelp = () => {
  const { t } = useTranslation()
  return <>
    <h2>{t('rules.astral-plane.title')}</h2>
    <p css={alignIcon}>
      <Trans defaults="rules.astral-plane.purpose"><Picture src={astral}/></Trans>
    </p>
  </>
}
