import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, useGame, useLegalMoves, usePlayerName } from '@gamepark/react-game'
import { isStartPlayerTurn, MaterialGame } from '@gamepark/rules-api'

export const InitiativeHeader = () => {
  const { t } = useTranslation()
  const activePlayer = useGame<MaterialGame>()!.rule!.player!
  const playerName = usePlayerName(activePlayer)
  const legalMoves = useLegalMoves()

  if (!legalMoves.length) {
    return <>{t('header.initiative', { player: playerName })}</>
  } else {
    return <Trans defaults="header.initiative.me"><PlayMoveButton move={legalMoves.find(isStartPlayerTurn)}/></Trans>
  }
}
