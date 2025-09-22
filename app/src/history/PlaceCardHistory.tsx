import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const PlaceCardHistory = ({ move, context: { game } }: MoveComponentProps) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(move.location.player)
  const card = game.items[MaterialType.FactionCard]![move.itemIndex]
  if (!card?.id?.front) return null
  return (
    <Trans i18nKey="history.place"
           values={{ ...move.location, player: playerName, card: t(`card.name.${getUniqueCard(card.id.front)}`) }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, card, move.itemIndex, 0)} transient/>
    </Trans>
  )
}
