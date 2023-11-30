/** @jsxImportSource @emotion/react */
import { FactionToken } from '@gamepark/arackhan-wars/material/FactionToken'
import { MaterialHelpProps } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'

export const FactionTokenHelp = (props: MaterialHelpProps) => {
  const { item } = props
  const { t } = useTranslation()
  return <>
    <h2>
      {item.id === FactionToken.Neutral ? t('rules.faction-token.neutral.title')
        : t('rules.faction-token.title', { faction: t(`faction.${item.id}`) })}
    </h2>
    <p>{t('rules.faction-token.purpose')}</p>
    {item.id === FactionToken.Neutral && <p>{t('rules.faction-token.neutral.purpose')}</p>}
    {item.location?.rotation && <p><Trans defaults="rules.faction-token.flipped"><strong/></Trans></p>}
  </>
}
