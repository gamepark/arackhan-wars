/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const StandardBearerActionHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const direction = rules.remind(Memory.Direction)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  if (playerId === activePlayer) {
    if (direction === undefined) {
      return <>{t('standard.bearer.move')}</>
    } else {
      return <Trans defaults="standard.bearer.move.legion"><PlayMoveButton move={pass}/></Trans>
    }
  } else {
    return <>{t('standard.bearer.player', { player })}</>
  }
}
