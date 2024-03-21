/** @jsxImportSource @emotion/react */
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, PlayMoveButton } from '@gamepark/react-game'
import { displayMaterialHelp, MaterialGame, MoveItem } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { FactionTokenBackground } from './RevealCardHistory'

type MoveCardHistoryProps = {
  game: MaterialGame
  move: MoveItem
}

export const MoveCardHistory = ({ game, move }: MoveCardHistoryProps) => {
  const { t } = useTranslation()
  const card = game.items[MaterialType.FactionCard]![move.itemIndex]
  if (!card?.id?.front) return null
  return <HistoryEntry backgroundColor={FactionTokenBackground[game.memory[Memory.PlayerFactionToken][move.location.player!]]} depth={1}>
    <Trans defaults="history.move"
           values={{ ...move.location, card: t(`card.name.${getUniqueCard(card.id.front)}`) }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, card, move.itemIndex, 0)} local/>
    </Trans>
  </HistoryEntry>
}
