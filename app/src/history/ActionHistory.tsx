import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { CustomMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const ActionHistory = ({ move, context: { game } }: MoveComponentProps<CustomMove>) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(game.rule.player)
  const cardItem = game.items[MaterialType.FactionCard]![move.data]
  if (!cardItem?.id?.front) return null
  return (
    <Trans i18nKey="history.action" values={{ player: playerName, card: t(`card.name.${getUniqueCard(cardItem.id.front)}`) }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, cardItem, move.data, 0)} transient/>
    </Trans>
  )
}
