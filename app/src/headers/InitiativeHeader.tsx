import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, useGame, useLegalMoves, usePlayerName } from '@gamepark/react-game'
import { isCustomMoveType, MaterialGame } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'

export const InitiativeHeader = () => {
  const { t } = useTranslation()
  const activePlayer = useGame<MaterialGame>()!.rule!.player!
  const playerName = usePlayerName(activePlayer)
  const legalMoves = useLegalMoves()

  if (!legalMoves.length) {
    return <>{t('header.initiative', { player: playerName })}</>
  } else {
    return <Trans defaults="header.initiative.me"><PlayMoveButton move={legalMoves.find(isCustomMoveType(CustomMoveType.Pass))}/></Trans>
  }
}
