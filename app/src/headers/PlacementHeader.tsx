import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, useGame, useLegalMoves, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { getPlayerName, PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { isStartPlayerTurn, isStartRule, MaterialGame, MaterialMove } from '@gamepark/rules-api'

export const PlacementHeader = () => {

  const { t } = useTranslation()
  const game = useGame<MaterialGame<PlayerId, MaterialType, LocationType>>()!
  const legalMoves = useLegalMoves<MaterialMove>()
  const playerName = usePlayerName(game.rule!.player!) || getPlayerName(game.rule!.player!, t)
  if (!legalMoves.length) {
    return <>{t('header.turn', { player: playerName })}</>
  }

  const passMove = legalMoves.find(move => isStartPlayerTurn(move) || isStartRule(move))
  if (passMove) {
    return <Trans defaults="header.placement.pass" components={[<PlayMoveButton move={passMove}/>]}/>
  }

  return <>Nothing to tell</>
}
