/** @jsxImportSource @emotion/react */
import { getUniqueCard } from '@gamepark/arackhan-wars/material/FactionCard'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { MoveComponentProps, PlayMoveButton } from '@gamepark/react-game'
import { CustomMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const AttackHistory = ({ context: { game }, move: { data: { card, target } } }: MoveComponentProps<CustomMove>) => {
  const { t } = useTranslation()
  const cardItem = game.items[MaterialType.FactionCard]![card]
  if (!cardItem?.id?.front) return null
  const targetItem = target !== undefined ? game.items[MaterialType.FactionCard]![target] : undefined
  return (
    <Trans defaults={`history.attack${targetItem === undefined ? '.omnistrike' : ''}`}
           values={{
             card: t(`card.name.${getUniqueCard(cardItem.id.front)}`),
             target: targetItem?.id ? t(`card.name.${getUniqueCard(targetItem.id.front)}`) : ''
           }}>
      <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, cardItem, card, 0)} local/>
      {targetItem && <PlayMoveButton move={displayMaterialHelp(MaterialType.FactionCard, targetItem, target, 0)} local/>}
    </Trans>
  )
}
