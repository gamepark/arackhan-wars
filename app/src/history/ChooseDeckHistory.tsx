/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { MoveComponentProps, PlayMoveButton, usePlayerName, useRules } from '@gamepark/react-game'
import { CustomMove, MaterialMoveBuilder } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp

export const ChooseDeckHistory = ({ move }: MoveComponentProps<CustomMove>) => {
  const player = move.data.player
  const playerName = usePlayerName(player)
  const rules = useRules<ArackhanWarsRules>()
  if (!rules) return null
  return (
    <Trans defaults="history.deck" values={{ player: playerName }}>
      <PlayMoveButton move={displayLocationHelp({ type: LocationType.PlayerDeck, player })} transient/>
    </Trans>
  )
}
