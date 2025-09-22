import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { MoveComponentProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { merge } from 'es-toolkit/compat'
import { Trans, useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const RevealCardHistory = ({ move, context: { game } }: MoveComponentProps) => {
  const { t } = useTranslation()
  const player = usePlayerName(move.location.player)
  const card = merge(game.items[move.itemType]![move.itemIndex], move.reveal, { location: move.location })
  return (
    <Trans i18nKey={`history.reveal${move.location.y !== undefined ? '.at' : ''}`}
           values={{ ...move.location, player, card: t(`card.name.${getUniqueCard(card.id.front)}`) }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, card, move.itemIndex, 0)} transient/>
    </Trans>
  )
}
