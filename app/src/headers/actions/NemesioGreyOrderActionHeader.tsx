/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const NemesioGreyOrderActionHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const nemesio = rules.remind(Memory.ActionCard)
  const actionCard = rules.material(MaterialType.FactionCard).getItem(nemesio)?.id.front
  const card = t(`card.name.${getUniqueCard(actionCard)}`)
  if (rules.remind(Memory.TargetCard) === undefined) {
    if (playerId === activePlayer) {
      return <>{t('header.destroy.you', { card })}</>
    } else {
      return <>{t('header.destroy.player', { card, player })}</>
    }
  } else {
    if (playerId === activePlayer) {
      return <>{t('header.mimic.you', { card })}</>
    } else {
      return <>{t('header.mimic.player', { card, player })}</>
    }
  }
}
