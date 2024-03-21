/** @jsxImportSource @emotion/react */
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, PlayMoveButton } from '@gamepark/react-game'
import { displayMaterialHelp, MaterialGame } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { FactionTokenBackground } from './RevealCardHistory'

type KillHistoryProps = {
  game: MaterialGame
  player: number
  card: number
}

export const KillHistory = ({ game, player, card }: KillHistoryProps) => {
  const { t } = useTranslation()
  const cardItem = game.items[MaterialType.FactionCard]![card]
  if (!cardItem?.id?.front) return null
  return <HistoryEntry backgroundColor={FactionTokenBackground[game.memory[Memory.PlayerFactionToken][player]]} depth={2}>
    <Trans defaults="history.kill" values={{ card: t(`card.name.${getUniqueCard(cardItem.id.front)}`) }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, cardItem, card, 0)} local/>
    </Trans>
  </HistoryEntry>
}
