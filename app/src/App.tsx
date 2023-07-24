/** @jsxImportSource @emotion/react */
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { useEffect, useState } from 'react'
import GameDisplay from './GameDisplay'
import { MaterialGame } from '@gamepark/rules-api'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { GameOverHeader } from './headers/GameOverHeader'
import { MulliganHeader } from './headers/MulliganHeader'
import { PlacementHeader } from './headers/PlacementHeader'
import { ChooseStartPlayerHeader } from './headers/ChooseStartPlayerHeader'
import { InitiativeHeader } from './headers/InitiativeHeader'
import { ActivationHeader } from './headers/ActivationHeader'

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed || isImagesLoading
  return (
    <>
      {!loading && <GameDisplay/>}
      <LoadingScreen display={loading} author={['Mickaël Bour', 'Robert Palmer']} artist="Robert Palmer" publisher="Nothing But Games" developer="Game Park"/>
      <MaterialHeader rulesStepsHeaders={RulesHeaders} GameOver={GameOverHeader}/>
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </>
  )
}

const RulesHeaders: Record<RuleId, () => ReactJSXElement> = {
  // TODO: all headers
  [RuleId.ChooseStartPlayer]: ChooseStartPlayerHeader,
  [RuleId.Mulligan]: MulliganHeader,
  [RuleId.DrawRule]: () => <p></p>,
  [RuleId.PlacementRule]: PlacementHeader,
  [RuleId.RevealRule]: () => <p></p>,
  [RuleId.InitiativeActivationRule]: InitiativeHeader,
  [RuleId.ActivationRule]: ActivationHeader,
  [RuleId.EndPhaseRule]: () => <p></p>,
  [RuleId.ForcedExileActionRule]: () => <p></p>,
  [RuleId.HorseOfAvalonActionRule]: () => <p></p>,
  [RuleId.TeleportationActionRule]: () => <p></p>
}
