/** @jsxImportSource @emotion/react */
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, PlayMoveButton } from '@gamepark/react-game'
import { MaterialGame, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { FactionTokenBackground } from './RevealCardHistory'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

type AttackHistoryProps = {
  game: MaterialGame
  player: number
  card: number
  target?: number
}

export const AttackHistory = ({ game, player, card, target }: AttackHistoryProps) => {
  const { t } = useTranslation()
  const cardItem = game.items[MaterialType.FactionCard]![card]
  if (!cardItem?.id?.front) return null
  const targetItem = target !== undefined ? game.items[MaterialType.FactionCard]![target] : undefined
  return <HistoryEntry backgroundColor={FactionTokenBackground[game.memory[Memory.PlayerFactionToken][player]]} depth={1}>
    <Trans defaults={`history.attack${targetItem === undefined ? '.omnistrike' : ''}`}
           values={{
             card: t(`card.name.${getUniqueCard(cardItem.id.front)}`),
             target: targetItem?.id ? t(`card.name.${getUniqueCard(targetItem.id.front)}`) : ''
           }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, cardItem, card, 0)} local/>
      {targetItem && <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, targetItem, target, 0)} local/>}
    </Trans>
  </HistoryEntry>
}
