/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { CardId, getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, PlayMoveButton, usePlayerName, useRules } from '@gamepark/react-game'
import { displayMaterialHelp, MoveItem } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { FactionTokenBackground } from './RevealCardHistory'

type PlaceCardHistoryProps = {
  move: MoveItem
}

export const PlaceCardHistory = ({ move }: PlaceCardHistoryProps) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(move.location.player)
  const rules = useRules<ArackhanWarsRules>()
  const card = rules?.material(MaterialType.FactionCard).getItem<CardId>(move.itemIndex)
  if (!rules || !card?.id?.front) return null
  return <HistoryEntry backgroundColor={FactionTokenBackground[rules.remind(Memory.PlayerFactionToken, move.location.player)]} depth={2}>
    <Trans defaults="history.place"
           values={{ ...move.location, player: playerName, card: t(`card.name.${getUniqueCard(card.id.front)}`) }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, card, move.itemIndex, 0)} local/>
    </Trans>
  </HistoryEntry>
}
