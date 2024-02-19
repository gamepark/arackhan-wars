/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const TargetCreatureActionHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()!
  const actionCard = rules.material(MaterialType.FactionCard).getItem(rules.remind(Memory.ActionCard))?.id.front
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  if (playerId === activePlayer) {
    return <>{t('header.target-creature.you', { card: t(`card.name.${getUniqueCard(actionCard)}`) })}</>
  } else {
    return <>{t('header.target-creature.player', { card: t(`card.name.${getUniqueCard(actionCard)}`), player })}</>
  }
}
