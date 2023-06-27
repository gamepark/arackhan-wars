import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, useGame, useLegalMoves, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { Faction } from '@gamepark/arackhan-wars/Faction'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { getPlayerName } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { MaterialGame, MaterialMove, MoveKind } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/arackhan-wars/material/CustomMoveType'

export const StartHeader = () => {

  const { t } = useTranslation()
  const game = useGame<MaterialGame<Faction, MaterialType, LocationType>>()!
  const legalMoves = useLegalMoves<MaterialMove>()
  const playerName = usePlayerName(game.rule!.player!) || getPlayerName(game.rule!.player!, t)
  if (!legalMoves.length) {
    return <>{t('header.turn', { player: playerName })}</>
  }
  const passMove = legalMoves.find(move => move.kind === MoveKind.CustomMove && move.type === CustomMoveType.Pass)
  if (passMove) {
    return <Trans defaults="header.start.pass" components={[<PlayMoveButton move={passMove}/>]}/>
  }

  return <>Nothing to tell</>
}
