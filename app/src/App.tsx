import { ReactNode } from 'react'
import { RuleId } from '@gamepark/arackhan-wars/rules/RuleId'
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialGameSounds, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useEffect, useState } from 'react'
import GameDisplay from './GameDisplay'
import { HorseOfAvalonActionHeader } from './headers/actions/HorseOfAvalonActionHeader'
import { MimicryActionHeader } from './headers/actions/MimicryActionHeader'
import { MoveCreatureActionHeader } from './headers/actions/MoveCreatureActionHeader'
import { ActivationHeader } from './headers/ActivationHeader'
import { ChooseStartPlayerHeader } from './headers/ChooseStartPlayerHeader'
import { DrawHeader } from './headers/DrawHeader'
import { EndPhaseHeader } from './headers/EndPhaseHeader'
import { GameOverRule } from './headers/GameOverRule'
import { MulliganHeader } from './headers/MulliganHeader'
import { PlacementHeader } from './headers/PlacementHeader'
import { RevealHeader } from './headers/RevealHeader'

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
      {!!game && <GameDisplay/>}
      <LoadingScreen display={loading}/>
      <MaterialHeader rulesStepsHeaders={RulesHeaders} GameOverRule={GameOverRule} loading={loading}/>
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)}/>
      <MaterialGameSounds/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </>
  )
}

const RulesHeaders: Record<RuleId, () => ReactNode> = {
  [RuleId.ChooseStartPlayer]: ChooseStartPlayerHeader,
  [RuleId.Mulligan]: MulliganHeader,
  [RuleId.DrawRule]: DrawHeader,
  [RuleId.PlacementRule]: PlacementHeader,
  [RuleId.RevealRule]: RevealHeader,
  [RuleId.ActivationRule]: ActivationHeader,
  [RuleId.SolvePerforations]: ActivationHeader,
  [RuleId.EndPhaseRule]: EndPhaseHeader,
  [RuleId.ForcedExileActionRule]: MoveCreatureActionHeader,
  [RuleId.HorseOfAvalonActionRule]: HorseOfAvalonActionHeader,
  [RuleId.TeleportationActionRule]: MoveCreatureActionHeader,
  [RuleId.MimicryActionRule]: MimicryActionHeader
}
