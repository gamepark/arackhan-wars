import { Trans, useTranslation } from 'react-i18next'
import { MaterialHelpProps } from '@gamepark/react-game'
import { TokenFaction } from '@gamepark/arackhan-wars/material/TokenFaction'

export const FactionTokenRules = (props: MaterialHelpProps) => {
  const { item } = props
  const { t } = useTranslation()
  const flipped = (item.location?.rotation as { y?: number } | undefined)?.y === 1
  return <>
    <h2>
      {item.id === TokenFaction.Neutral ? t('rules.faction-token.neutral.title')
        : t('rules.faction-token.title', { faction: t(`faction.${item.id}`) })}
    </h2>
    <p>{t('rules.faction-token.purpose')}</p>
    {item.id === TokenFaction.Neutral && <p>{t('rules.faction-token.neutral.purpose')}</p>}
    {flipped && <p><Trans i18nKey="rules.faction-token.flipped"><strong/></Trans></p>}
  </>
}
