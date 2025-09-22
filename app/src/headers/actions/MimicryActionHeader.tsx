import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const MimicryActionHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const target = rules.remind(Memory.TargetCard)
  if (target === undefined) {
    if (playerId === activePlayer) {
      return <>{t('mimicry.target.choose')}</>
    } else {
      return <>{t('mimicry.target.choice', { player })}</>
    }
  } else {
    const actionCard = rules.material(MaterialType.FactionCard).getItem(rules.remind(Memory.ActionCard))?.id.front
    if (playerId === activePlayer) {
      return <>{t('header.mimic.you', { card: t(`card.name.${getUniqueCard(actionCard)}`) })}</>
    } else {
      return <>{t('header.mimic.player', { player, card: t(`card.name.${getUniqueCard(actionCard)}`) })}</>
    }
  }
}
