import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, UndoMovesButton, useGame, useLegalMove, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialGame, MaterialMove, MoveKind } from '@gamepark/rules-api'

export const PlacementHeader = () => {
  const { t } = useTranslation()
  const activePlayer = useGame<MaterialGame>()!.rule!.player!
  const player = usePlayerId()
  const playerName = usePlayerName(activePlayer)
  const validate = useLegalMove<MaterialMove>(move => move.kind === MoveKind.RulesMove)

  if (player !== activePlayer) {
    return <>{t('header.placement', { player: playerName })}</>
  } else if (validate) {
    return <Trans i18nKey="header.placement.validate">
      <PlayMoveButton move={validate} auto={15}/>
      <UndoMovesButton moves={2}/>
    </Trans>
  } else {
    return <>{t('header.placement.me')}</>
  }
}
