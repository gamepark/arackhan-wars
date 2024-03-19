/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { CardId, getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, PlayMoveButton, useRules } from '@gamepark/react-game'
import { displayMaterialHelp } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { FactionTokenBackground } from './RevealCardHistory'

type AttackHistoryProps = {
  player: number
  card: number
  target?: number
}

export const AttackHistory = ({ player, card, target }: AttackHistoryProps) => {
  const { t } = useTranslation()
  const rules = useRules<ArackhanWarsRules>()
  const cardItem = rules?.material(MaterialType.FactionCard).getItem<CardId>(card)
  if (!rules || !cardItem?.id?.front) return null
  const targetItem = target !== undefined ? rules?.material(MaterialType.FactionCard).getItem<CardId>(target) : undefined
  return <HistoryEntry backgroundColor={FactionTokenBackground[rules.remind(Memory.PlayerFactionToken, player)]} depth={1}>
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
