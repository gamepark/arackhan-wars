/** @jsxImportSource @emotion/react */
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { MoveComponentProps, PlayMoveButton } from '@gamepark/react-game'
import { MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

  export const KillHistory = ({ move, context: { game } }: MoveComponentProps<MoveItem>) => {
  const { t } = useTranslation()
  const cardItem = game.items[MaterialType.FactionCard]![move.itemIndex]
  if (!cardItem?.id?.front) return null
  return (
    <Trans defaults="history.kill" values={{ card: t(`card.name.${getUniqueCard(cardItem.id.front)}`) }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, cardItem, move.itemIndex, 0)} transient/>
    </Trans>
  )
}
