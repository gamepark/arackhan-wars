/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const EssenceAbsorptionActionHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()!
  const activePlayer = rules.getActivePlayer()
  const target = rules.remind(Memory.TargetCard)
  const player = usePlayerName(activePlayer)
  if (target === undefined) {
    const essenceAbsorption = rules.remind(Memory.ActionCard)
    const actionCard = rules.material(MaterialType.FactionCard).getItem(essenceAbsorption)?.id.front
    const card = t(`card.name.${getUniqueCard(actionCard)}`)
    if (playerId === activePlayer) {
      return <>{t('header.destroy.you', { card })}</>
    } else {
      return <>{t('header.destroy.player', { card, player })}</>
    }
  } else {
    if (playerId === activePlayer) {
      return <>{t('essence-absorption.you')}</>
    } else {
      return <>{t('essence-absorption.player', { player })}</>
    }
  }
}
