import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { CreateItem, isMoveItem, MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const TakeHistory = ({ move, context: { game } }: MoveComponentProps<MoveItem | CreateItem>) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(game.rule.player)
  const card = isMoveItem(move) ? move.location.parent! : move.item.location.parent!
  const cardItem = game.items[MaterialType.FactionCard]![card]
  if (!cardItem?.id?.front) return null
  return (
    <Trans i18nKey="history.take" values={{ player: playerName, card: t(`card.name.${getUniqueCard(cardItem.id.front)}`) }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, cardItem, card, 0)} transient/>
    </Trans>
  )
}
