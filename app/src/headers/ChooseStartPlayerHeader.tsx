/** @jsxImportSource @emotion/react */
import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, RulesDialog, ThemeButton, useGame, useLegalMoves, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/arackhan-wars/material/MaterialType'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { PlayerId } from '@gamepark/arackhan-wars/ArackhanWarsOptions'
import { CustomMove, isCustomMove, MaterialGame } from '@gamepark/rules-api'
import { useState } from 'react'
import { css } from '@emotion/react'

export const ChooseStartPlayerHeader = () => {
  const { t } = useTranslation()
  const game = useGame<MaterialGame<PlayerId, MaterialType, LocationType>>()!
  const player = usePlayerId()
  const legalMoves = useLegalMoves<CustomMove>(isCustomMove)
  const playerName = usePlayerName(game.rule!.player!)
  const [dialogOpen, setDialogOpen] = useState(legalMoves.length > 0)
  if (!legalMoves.length) {
    return <>{t('header.start', { player: playerName })}</>
  }
  return (
    <>
      <Trans defaults="header.start.choice"><ThemeButton onClick={() => setDialogOpen(true)}/></Trans>
      <RulesDialog open={dialogOpen} close={() => setDialogOpen(false)}>
        <div css={rulesCss}>
          <h2><Trans defaults="header.start.choice"><span/></Trans></h2>
          <p>
            <PlayMoveButton move={legalMoves.find(move => move.data === player)}>
              {t('rules.start.choose.me')}
            </PlayMoveButton>
          </p>
          {legalMoves.filter(move => move.data !== player).map(move =>
            <p key={move.data}><ChoosePlayerButton move={move}/></p>
          )}
        </div>
      </RulesDialog>
    </>
  )
}

const ChoosePlayerButton = ({ move }: { move: CustomMove }) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(move.data)
  return <PlayMoveButton move={move}>{t('rules.start.choose.player', { player: playerName })}</PlayMoveButton>
}

const rulesCss = css`
  max-width: 40em;
  margin: 1em;
  font-size: 3em;

  > h2 {
    margin-right: 2em;
  }

  > p {
    white-space: break-spaces;
  }
`
