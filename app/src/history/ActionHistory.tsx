/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { CardId, getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, PlayMoveButton, usePlayerName, useRules } from '@gamepark/react-game'
import { displayMaterialHelp } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { FactionTokenBackground } from './RevealCardHistory'

type ActionHistoryProps = {
  player: number
  card: number
}

export const ActionHistory = ({ player, card }: ActionHistoryProps) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(player)
  const rules = useRules<ArackhanWarsRules>()
  const cardItem = rules?.material(MaterialType.FactionCard).getItem<CardId>(card)
  if (!rules || !cardItem?.id?.front) return null
  return <HistoryEntry backgroundColor={FactionTokenBackground[rules.remind(Memory.PlayerFactionToken, player)]} depth={1}>
    <Trans defaults="history.action" values={{ player: playerName, card: t(`card.name.${getUniqueCard(cardItem.id.front)}`) }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, cardItem, card, 0)} local/>
    </Trans>
  </HistoryEntry>
}
