/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, useGame, useLegalMoves, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { isEndPlayerTurn, MaterialGame, MaterialMove } from '@gamepark/rules-api'

export const MulliganHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<PlayerId, MaterialType, LocationType>>()!
  const legalMoves = useLegalMoves<MaterialMove>()
  const playerName = usePlayerName(game.rule!.player!)
  if (!legalMoves.length) {
    return <>{t('header.turn', { player: playerName })}</>
  }
  const passMove = legalMoves.find(isEndPlayerTurn)
  if (passMove) {
    return <Trans defaults="header.start.pass"><PlayMoveButton move={passMove}/></Trans>
  }

  return <>Nothing to tell</>
}
