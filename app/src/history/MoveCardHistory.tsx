/** @jsxImportSource @emotion/react */
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { MoveComponentProps, PlayMoveButton } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const MoveCardHistory = ({ move, context: { game } }: MoveComponentProps) => {
  const { t } = useTranslation()
  const card = game.items[MaterialType.FactionCard]![move.itemIndex]
  if (!card?.id?.front) return null
  return (
    <Trans defaults="history.move"
           values={{ ...move.location, card: t(`card.name.${getUniqueCard(card.id.front)}`) }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, card, move.itemIndex, 0)} local/>
    </Trans>
  )
}
