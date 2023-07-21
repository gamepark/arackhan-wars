import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, useGame, useLegalMoves, usePlayerName } from '@gamepark/react-game'
import { isStartPlayerTurn, MaterialGame } from '@gamepark/rules-api'

export const ActivationHeader = () => {
  const { t } = useTranslation()
  const activePlayer = useGame<MaterialGame>()!.rule!.player!
  const playerName = usePlayerName(activePlayer)
  const legalMoves = useLegalMoves()

  if (!legalMoves.length) {
    return <>{t('header.activation', { player: playerName })}</>
  } else {
    return <Trans defaults="header.activation.me"><PlayMoveButton move={legalMoves.find(isStartPlayerTurn)}/></Trans>
  }
}
