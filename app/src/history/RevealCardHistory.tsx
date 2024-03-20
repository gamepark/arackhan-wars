/** @jsxImportSource @emotion/react */
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { FactionToken } from '@gamepark/arackhan-wars/material/FactionToken'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { displayMaterialHelp, MaterialGame, MoveItem } from '@gamepark/rules-api'
import merge from 'lodash/merge'
import { Trans, useTranslation } from 'react-i18next'

type RevealCardHistoryProps = {
  move: MoveItem
  game: MaterialGame
}

export const RevealCardHistory = ({ move, game }: RevealCardHistoryProps) => {
  const { t } = useTranslation()
  const player = usePlayerName(move.location.player)
  const card = merge(game.items[move.itemType]![move.itemIndex], move.reveal, { location: move.location })
  return <HistoryEntry player={move.location.player} backgroundColor={FactionTokenBackground[game.memory[Memory.PlayerFactionToken][move.location.player!]]}>
    <Trans defaults={`history.reveal${move.location.y !== undefined ? '.at' : ''}`}
           values={{ ...move.location, player, card: t(`card.name.${getUniqueCard(card.id.front)}`) }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, card, move.itemIndex, 0)} local/>
    </Trans>
  </HistoryEntry>
}

export const FactionTokenBackground: Record<FactionToken, string> = {
  [FactionToken.Whitelands]: '#C6E8F3',
  [FactionToken.Nakka]: '#CDE5CB',
  [FactionToken.GreyOrder]: '#E3E3E3',
  [FactionToken.Blight]: '#F9CDCA',
  [FactionToken.Neutral]: '#FEDCB9'
}
