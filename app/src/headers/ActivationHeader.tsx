import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, useGame, useLegalMoves, usePlayerName } from '@gamepark/react-game'
import { isCustomMoveType, isStartPlayerTurn, MaterialGame } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'

export const ActivationHeader = () => {
  const { t } = useTranslation()
  const activePlayer = useGame<MaterialGame>()!.rule!.player!
  const playerName = usePlayerName(activePlayer)
  const legalMoves = useLegalMoves()

  if (!legalMoves.length) {
    return <>{t('header.activation', { player: playerName })}</>
  } else {
    const solveAttack = legalMoves.find(isCustomMoveType(CustomMoveType.SolveAttack))
    if (solveAttack) {
      return <Trans defaults="You can play card, <0>pass</0> or <1>solve your attack</1>">
        <PlayMoveButton move={legalMoves.find(isStartPlayerTurn)}/>
        <PlayMoveButton move={solveAttack}/>
      </Trans>
    }
    return <Trans defaults="header.activation.me"><PlayMoveButton move={legalMoves.find(isStartPlayerTurn)}/></Trans>
  }
}
