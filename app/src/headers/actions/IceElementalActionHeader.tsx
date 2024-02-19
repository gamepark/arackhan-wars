/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { PlayMoveButton, useLegalMoves, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'

export const IceElementalActionHeader = () => {
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const rules = useRules<ArackhanWarsRules>()!
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const legalMoves = useLegalMoves()
  if (playerId === activePlayer) {
    return <Trans defaults="header.ice-elemental.you">
      {legalMoves.map((move, index) => <PlayMoveButton key={index} move={move}/>)}
    </Trans>
  } else {
    return <>{t('header.ice-elemental.player', { player })}</>
  }
}
