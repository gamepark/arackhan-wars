import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const PlaceCreatureActionHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()!
  const actionCard = rules.remind<number>(Memory.ActionCard)
  const card = t(`card.name.${getUniqueCard(rules.material(MaterialType.FactionCard).getItem(actionCard)!.id.front)}`)
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  if (playerId === activePlayer) {
    return <>{t('header.action.place-creature', { card })}</>
  } else {
    return <>{t('header.action.place-creature.player', { card, player })}</>
  }
}
