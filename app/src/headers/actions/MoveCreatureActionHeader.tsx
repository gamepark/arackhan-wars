/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'

export const MoveCreatureActionHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()!
  const actionCard = rules.material(MaterialType.FactionCard).getItem(rules.remind(Memory.ActionCard))?.id.front
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  if (playerId === activePlayer) {
    return <>{t('action.move.creature', { card: t(`card.name.${actionCard}`) })}</>
  } else {
    return <>{t('action.move.creature.player', { card: t(`card.name.${actionCard}`), player })}</>
  }
}
