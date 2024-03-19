/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { CardId, getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, PlayMoveButton, useRules } from '@gamepark/react-game'
import { displayMaterialHelp, MoveItem } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { FactionTokenBackground } from './RevealCardHistory'

type MoveCardHistoryProps = {
  move: MoveItem
}

export const MoveCardHistory = ({ move }: MoveCardHistoryProps) => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()
  const card = rules?.material(MaterialType.FactionCard).getItem<CardId>(move.itemIndex)
  if (!rules || !card?.id?.front) return null
  return <HistoryEntry backgroundColor={FactionTokenBackground[rules.remind(Memory.PlayerFactionToken, move.location.player)]} depth={1}>
    <Trans defaults="history.move"
           values={{ ...move.location, card: t(`card.name.${getUniqueCard(card.id.front)}`) }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, card, move.itemIndex, 0)} local/>
    </Trans>
  </HistoryEntry>
}
