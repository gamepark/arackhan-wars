/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { linkButtonCss, PlayMoveButton } from '@gamepark/react-game'
import { displayLocationHelp } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'

export const BattleMatHelp = () => {
  const { t } = useTranslation()
  return <>
    <h2>{t('rules.battle-mat.title')}</h2>
    <p>{t('rules.battle-mat.purpose')}</p>
    <Trans defaults="rules.battle-mat.players">
      <PlayMoveButton css={linkButtonCss} move={displayLocationHelp({ type: LocationType.AstralPlane })} local/>
    </Trans>
    <p>{t('rules.battle-mat.battlefield')}</p>
  </>
}
