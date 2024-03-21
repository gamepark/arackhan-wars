/** @jsxImportSource @emotion/react */
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { Memory } from '@gamepark/arackhan-wars/rules/Memory'
import { HistoryEntry, PlayMoveButton, usePlayerName, useRules } from '@gamepark/react-game'
import { displayLocationHelp } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { FactionTokenBackground } from './RevealCardHistory'

type ChooseDeckHistoryProps = {
  player: number
}

export const ChooseDeckHistory = ({ player }: ChooseDeckHistoryProps) => {
  const playerName = usePlayerName(player)
  const rules = useRules<ArackhanWarsRules>()
  if (!rules) return null
  return <HistoryEntry player={player} backgroundColor={FactionTokenBackground[rules.remind(Memory.PlayerFactionToken, player)]}>
    <Trans defaults="history.deck" values={{ player: playerName }}>
      <PlayMoveButton move={displayLocationHelp({ type: LocationType.PlayerDeck, player })} local/>
    </Trans>
  </HistoryEntry>
}
