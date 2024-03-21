/** @jsxImportSource @emotion/react */
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { displayMaterialHelp, MaterialGame, MoveItem } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { FactionTokenBackground } from './RevealCardHistory'

type PlaceCardHistoryProps = {
  game: MaterialGame
  move: MoveItem
}

export const PlaceCardHistory = ({ game, move }: PlaceCardHistoryProps) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(move.location.player)
  const card = game.items[MaterialType.FactionCard]![move.itemIndex]
  if (!card?.id?.front) return null
  return <HistoryEntry backgroundColor={FactionTokenBackground[game.memory[Memory.PlayerFactionToken][move.location.player!]]} depth={2}>
    <Trans defaults="history.place"
           values={{ ...move.location, player: playerName, card: t(`card.name.${getUniqueCard(card.id.front)}`) }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, card, move.itemIndex, 0)} local/>
    </Trans>
  </HistoryEntry>
}
