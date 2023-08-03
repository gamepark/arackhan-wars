/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { isCustomMove } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'

export const FactionCardRules = (props: MaterialRulesProps) => {
  const { itemIndex, closeDialog } = props
  const { t } = useTranslation()
  const performAction = useLegalMove(move => isCustomMove(move) && move.type === CustomMoveType.PerformAction && move.data === itemIndex)
  return <>
    <hr/>
    {performAction && <PlayMoveButton move={performAction} onPlay={closeDialog}>{t('card.action.perform')}</PlayMoveButton>}
  </>
}
