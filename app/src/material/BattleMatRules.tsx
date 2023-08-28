/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton } from '@gamepark/react-game/dist/components/buttons/PlayMoveButton/PlayMoveButton'
import { linkButtonCss } from '@gamepark/react-game/dist/css/buttonCss'
import { displayLocationRules } from '@gamepark/rules-api/dist/material/moves/local/DisplayRules'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'

export const BattleMatRules = () => {
  const { t } = useTranslation()
  return <>
    <h2>{t('rules.battle-mat.title')}</h2>
    <p>{t('rules.battle-mat.purpose')}</p>
    <Trans defaults="rules.battle-mat.players">
      <PlayMoveButton css={linkButtonCss} move={displayLocationRules({ type: LocationType.AstralPlane })} local/>
    </Trans>
    <p>{t('rules.battle-mat.battlefield')}</p>
  </>
}
