import { pointerWithin } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { ArackhanWarsRules } from '@gamepark/arackhan-wars/ArackhanWarsRules'
import { LocationType } from '@gamepark/arackhan-wars/material/LocationType'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { GameTable, GameTableNavigation, usePlay, usePlayerId, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { useEffect } from 'react'
import { BattlefieldHelp } from './BattlefieldHelp'
import { PlayerPanels } from './panels/PlayerPanels'
import displayLocationHelp = MaterialMoveBuilder.displayLocationHelp

export default function GameDisplay() {
  useOpponentDeckDisplay()
  return <>
    <GameTable xMin={-29} xMax={73} yMin={-29} yMax={29} collisionAlgorithm={pointerWithin}>
      <BattlefieldHelp/>
      <GameTableNavigation css={navigationCss}/>
    </GameTable>
    <PlayerPanels/>
  </>
}

const navigationCss = css`
  left: auto;
  right: 2em;
  top: 50.5em;
`

function useOpponentDeckDisplay() {
  const isChooseStartPlayer = useRules<ArackhanWarsRules>()?.game.rule?.id === RuleId.ChooseStartPlayer
  const player = usePlayerId()
  const play = usePlay()
  useEffect(() => {
    if (isChooseStartPlayer && player !== undefined)
      play(displayLocationHelp({ type: LocationType.PlayerDeck, player: player === 1 ? 2 : 1 }), { transient: true })
  }, [isChooseStartPlayer, player])
}
