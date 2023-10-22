/** @jsxImportSource @emotion/react */
import { TokenFaction } from '@gamepark/arackhan-wars/material/TokenFaction'
import { MaterialRulesProps } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'

export const FactionTokenRules = (props: MaterialRulesProps) => {
  const { item } = props
  const { t } = useTranslation()
  return <>
    <h2>
      {item.id === TokenFaction.Neutral ? t('rules.faction-token.neutral.title')
        : t('rules.faction-token.title', { faction: t(`faction.${item.id}`) })}
    </h2>
    <p>{t('rules.faction-token.purpose')}</p>
    {item.id === TokenFaction.Neutral && <p>{t('rules.faction-token.neutral.purpose')}</p>}
    {item.location?.rotation && <p><Trans defaults="rules.faction-token.flipped"><strong/></Trans></p>}
  </>
}
