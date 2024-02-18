/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const BackupActionHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const count = rules.remind(Memory.Count)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  if (playerId === activePlayer) {
    if (count === 2) {
      return <>{t('backup.choose')}</>
    } else {
      return <Trans defaults="backup.pass"><PlayMoveButton move={pass}/></Trans>
    }
  } else {
    return <>{t('backup.player', { player })}</>
  }
}
